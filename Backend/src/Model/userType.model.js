import mongoose from "mongoose";

const userTypeSchema = new mongoose.Schema({

    userType: {
        type: String,
        required: true,
        enum: ["customer", "admin"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const userTypeModel = mongoose.model("UserType", userTypeSchema);

export default userTypeModel;