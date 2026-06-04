import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    },
    token: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);
export default userModel;