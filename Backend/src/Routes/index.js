import express from "express";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import userTypeRouter from "./userType.route.js";
import cartRouter from "./cart.route.js";
import orderRouter from "./order.route.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/userType", userTypeRouter);
router.use("/cart",cartRouter);
router.use("/order", orderRouter);
export default router;