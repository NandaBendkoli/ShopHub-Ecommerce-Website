import CartModel from "../Model/cart.model.js";
import ProductModel from "../Model/product.model.js";
import userModel from "../Model/user.model.js";
import { errorResponse, successResponse } from "../Utils/response.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        const user = await userModel.findOne({ userId, isDeleted: false });
        if (!user) {
            return errorResponse(res, "User not found!");
        }

        const product = await ProductModel.findOne({ productId, isDeleted: false });
        if (!product) {
            return errorResponse(res, "Product not found!");
        }
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            cart = new CartModel({
                userId,
                products: [{ productId, quantity, name: product.name, price: product.price, image: product.image, rating: product.rating }],
                totalAmount: quantity * product.price,
            });
        } else {
            const existingProductIndex = cart.products.findIndex(
                (item) => item.productId === productId
            );
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;
                cart.totalAmount += quantity * product.price;
            } else {
                cart.products.push({ productId, quantity, name: product.name, price: product.price, image: product.image, rating: product.rating });
                cart.totalAmount += quantity * product.price;
            }
        }

        await cart.save();
        
        return successResponse(res, "Product added to cart successfully!", cart);
    }
    catch (error) {
        console.log(error);
        return errorResponse(
            res,
            "Error Occured while adding to cart"
        );
    }
}

export const getCartItems = async (req, res) => {
    try {
        const userId = req.user.userId;

        const cart = await CartModel.findOne({
            userId,
            isDeleted: false,
        });

        return successResponse(
            res,
            "Cart fetched successfully",
            cart
        );
    } catch (error) {
        console.log(error);
        return errorResponse(
            res,
            "Error while fetching cart"
        );
    }
};


export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.body;
        const cart = await CartModel.findOne({ userId, isDeleted: false });
        if (!cart) {
            return errorResponse(res, "Cart not found!");
        }
        const productIndex = cart.products.findIndex(
            (item) => item.productId === productId
        );
        if (productIndex === -1) {
            return errorResponse(res, "Product not found in cart!");
        }
        const product = cart.products[productIndex];
        cart.totalAmount -= product.price * product.quantity;
        cart.products.splice(productIndex, 1);
        await cart.save();
        return successResponse(res, "Product removed from cart successfully!", cart);
    } catch (error) {
        console.log(error);
        return errorResponse(
            res,
            "Error while removing from cart"
        );
    }
}