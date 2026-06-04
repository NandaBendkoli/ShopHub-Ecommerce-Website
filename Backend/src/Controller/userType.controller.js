import userTypeModel from "../Model/userType.model.js";
import { errorResponse, successResponse } from './../Utils/response.js';


export const createUserType = async (req, res) => {

    const { userType } = req.body;
    if (userType !== "customer" && userType !== "admin") {
        return errorResponse(res, 'Invalid user type. Allowed values are "customer" and "admin".');
    }

    try {
        const newType = await userTypeModel.create({ userType });
        return successResponse(res, 'User type created successfully', newType);
    } catch (error) {
        return errorResponse(res, 'Failed to create user type', error);
    }

}


export const getAllUserTypes = async (req, res) => {
    try {
        const userTypes = await userTypeModel.find({ isDeleted: false });
        return successResponse(res, 'User types fetched successfully', userTypes);
    } catch (error) {
        return errorResponse(res, 'Failed to fetch user types', error);
    }
}
