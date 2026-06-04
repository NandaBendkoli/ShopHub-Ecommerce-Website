import express from "express";
import {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
} from "../Controller/product.controller.js";

const router = express.Router();

router.post("/createProduct", createProduct);
router.post("/getProducts", getProducts);
router.post("/getProductById", getProductById);
router.post("/updateProduct", updateProduct);



export default router;