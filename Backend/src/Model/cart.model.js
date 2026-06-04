import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: "user",
            required: true,
            unique: true,
        },

        products: [
            {
                productId: {
                    type: String,
                    ref: "product",
                    required: true,
                },
                name: {
                    type: String,
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },

                price: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                }
            },
        ],

        totalAmount: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;