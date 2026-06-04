import express from "express";
import { getMyOrders, placeOrder, getOrderById, cancelOrder, updateOrderStatus, getAllOrders } from "../Controller/order.controller.js";
import { authMiddlware } from './../Middleware/authMiddlware.js';

const router = express.Router();

router.post("/placeOrder", authMiddlware, placeOrder);
router.post("/getMyOrders", authMiddlware, getMyOrders);
router.post("/getOrderById", getOrderById);
router.post("/cancelOrder", cancelOrder);
router.post("/updateOrderStatus", updateOrderStatus);
router.post("/getAllOrders", getAllOrders);



export default router;
