import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true
        },

        userId: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
        },

        products: [
            {
                productId: String,
                name: String,
                image: String,
                price: Number,
                quantity: Number,
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["PENDING", "COMPLETED", "FAILED"],
            default: "PENDING",
        },

        orderStatus: {
            type: String,
            enum: [
                "PLACED",
                "CONFIRMED",
                "PACKED",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED",
            ],
            default: "PLACED",
        },

        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;