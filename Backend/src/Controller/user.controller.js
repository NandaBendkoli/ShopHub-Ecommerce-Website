import userModel from "../Model/user.model.js";
import { errorResponse, successResponse } from "../Utils/response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getNextSequence } from "../Utils/index.js";

dotenv.config();

export const register = async (req, res) => {

    try {
        const { userName, email, password, mobile, gender, userType, address } = req.body;

        const userId = "User_" + await getNextSequence("user", 100000);


        if (!userName || !email || !password || !mobile || !gender || !userType || !address) {

            return errorResponse(res, "All Fields are Required!");
        }

        if (userType !== "customer" && userType !== "admin") {
            return errorResponse(res, "Invalid user type. Allowed values are 'customer' and 'admin'.");
        }

        const isFoundEmail = await userModel.findOne({ isDeleted: false, email });
        const isFoundMobile = await userModel.findOne({ isDeleted: false, mobile });

        if (isFoundEmail || isFoundMobile) {
            return errorResponse(res, "Mobile or phone exist in databse!")
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            userId,
            userName,
            email,
            mobile,
            password: hashPassword,
            gender,
            userType,
            address
        })

        if (!user) {
            return errorResponse(res, "Error occured in apis")
        }

        return successResponse(res, "User created Successfully!", user)
    } catch (error) {
        console.log(error);

    }

}

// get all users pagination 
export const getAllUsers = async (req, res) => {

    try {

        const {
            page = 1,
            limit = 5,
            searchTitle
        } = req.body;

        // convert into number
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // skip
        const skip = (pageNumber - 1) * limitNumber;

        // query
        let query = {
            isDeleted: false
        };

        // search
        if (searchTitle) {

            query.userName = {
                $regex: searchTitle,
                $options: "i"
            };

        }

        // fetch users + total count
        const [users, total] = await Promise.all([

            userModel
                .find(query)
                .select("-password")
                .skip(skip)
                .limit(limitNumber)
                .sort({ createdAt: -1 }),

            userModel.countDocuments(query)

        ]);

        // total pages
        const totalPages = Math.ceil(total / limitNumber);

        return successResponse(
            res,
            "Users fetched successfully!",
            {
                currentPage: pageNumber,
                totalPages,
                totalUsers: total,
                users
            }
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            "Error occurred while fetching users"
        );
    }
};
export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return errorResponse(res, "All fields are required");
        }

        const user = await userModel.findOne({ email, isDeleted: false });
        if (!user) {
            return errorResponse(res, "User not found!")
        }

        const token = jwt.sign({
            userId: user.userId,
            userName: user.userName,
            email: user.email,
            mobile: user.mobile,
            gender: user.gender,
            userType: user.userType
        },
            process.env.SECRETE_KEY,
            { expiresIn: "7d" }
        )

        user.token = token;
        await user.save();

        // save dtoken into cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        return successResponse(res, "Login successful!", user);
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await userModel.findOne({
            userId,
            isDeleted: false
        });

        // console.log("Found User =>", user);

        if (!user) {
            return errorResponse(res, "User not found!");
        }

        user.token = null;
        await user.save();

        res.clearCookie("token");

        return successResponse(
            res,
            "User logout successfully!"
        );

    } catch (error) {
        console.log(error);
        return errorResponse(
            res,
            "Error Occured while logout"
        );
    }
};

export const userProfile = async (req, res) => {
    try {

        const userId = req.user.userId;

        const user = await userModel.findOne({
            userId,
            isDeleted: false

        }).select("-password");

        if (!user) {
            return errorResponse(res, "User not found!")
        }

        return successResponse(
            res,
            "User Profile Fetch Sucessfully!",
            user
        );

    }
    catch (error) {
        console.log(error);
        return errorResponse(
            res,
            "Error Occured while fetching user profile"
        );
    }

}

export const update = async (req, res) => {
    try {
        const { userName, email, mobile, gender, userType, address } = req.body;

        const userId = req.user.userId;

        if (!userName || !email || !mobile || !gender || !userType || !address) {
            return errorResponse(res, "All Fields are Required!");
        }

        const updatedUser = await userModel.findOneAndUpdate(
            {
                userId,
                isDeleted: false,
            },
            {
                userName,
                email,
                mobile,
                gender,
                userType,
                address
            },
            {
                new: true,
            }
        );

        if (!updatedUser) {
            return errorResponse(res, "User not found");
        }

        return successResponse(
            res,
            "Profile updated successfully!",
            updatedUser
        );
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error while updating profile");
    }
};

export const changePassword = async (req, res) => {

    try {
        const userId = req.user.userId;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return errorResponse(res, "All fields are required!")
        }

        const user = await userModel.findOne({
            userId,
            isDeleted: false
        });

        if (!user) {
            return errorResponse(res, "User not found!")
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return errorResponse(res, "Old Password is incorrect!")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return successResponse(res, "Password changed successfully!", user);

    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "Error while changing password")
    }


}