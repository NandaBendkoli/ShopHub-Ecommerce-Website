import express from "express";
import { addToCart, getCartItems, removeFromCart } from "../Controller/cart.controller.js";
import { authMiddlware } from "../Middleware/authMiddlware.js";

const router = express.Router();

router.post("/addToCart", authMiddlware, addToCart);
router.get("/getCartItems", authMiddlware, getCartItems);
router.post("/removeFromCart", authMiddlware, removeFromCart);


export default router;

