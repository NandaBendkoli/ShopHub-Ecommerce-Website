import OrderModel from "../Model/order.model.js";
import CartModel from "../Model/cart.model.js";
import { successResponse, errorResponse } from "../Utils/response.js";
import { getNextSequence } from "../Utils/index.js";
import userModel from "../Model/user.model.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.userId;

        const { address } = req.body;

        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return errorResponse(res, "Cart is empty");
        }

        const orderId = "Order_" + await getNextSequence("orderId");
        // const user = await userModel.findOne({
        //     userId
        // });
        const order = await OrderModel.create({
            orderId,
            userId,
            userName: req.user.userName,
            products: cart.products,
            totalAmount: cart.totalAmount,
            address,
            paymentStatus: "PENDING",
            orderStatus: "PLACED",
        });
        cart.products = [];
        cart.totalAmount = 0;

        await cart.save();

        return successResponse(
            res,
            "Order placed successfully",
            order
        );
    } catch (error) {
        console.log(error);

        return errorResponse(
            res,
            "Error while placing order"
        );
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.userId;

        const orders = await OrderModel.find({
            userId,
        }).sort({ createdAt: -1 });

        return successResponse(
            res,
            "Orders fetched successfully",
            orders
        );
    } catch (error) {
        console.log(error);

        return errorResponse(
            res,
            "Error while fetching orders"
        );
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 });
        return successResponse(
            res,
            "Orders fetched successfully",
            orders
        );
    } catch (error) {
        console.log(error);
        return errorResponse(
            res,
            "Error while fetching orders"
        );
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await OrderModel.findOne({
            orderId,
        });

        if (!order) {
            return errorResponse(
                res,
                "Order not found"
            );
        }

        return successResponse(
            res,
            "Order fetched successfully",
            order
        );
    } catch (error) {
        console.log(error);

        return errorResponse(
            res,
            "Error while fetching order"
        );
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await OrderModel.findOne({
            orderId,
        });

        if (!order) {
            return errorResponse(
                res,
                "Order not found"
            );
        }

        order.orderStatus = "CANCELLED";

        await order.save();

        return successResponse(
            res,
            "Order cancelled successfully",
            order
        );
    } catch (error) {
        console.log(error);

        return errorResponse(
            res,
            "Error while cancelling order"
        );
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const {
            orderId,
            orderStatus,
            paymentStatus,
        } = req.body;

        const order = await OrderModel.findOne({
            orderId,
        });

        if (!order) {
            return errorResponse(
                res,
                "Order not found"
            );
        }

        if (orderStatus) {
            order.orderStatus = orderStatus;
        }

        if (paymentStatus) {
            order.paymentStatus = paymentStatus;
        }

        await order.save();

        return successResponse(
            res,
            "Order updated successfully",
            order
        );
    } catch (error) {
        console.log(error);

        return errorResponse(
            res,
            "Error updating order"
        );
    }
};