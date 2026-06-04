import express from "express";
import { getAllUsers, login, register, logout, userProfile, update, changePassword } from "../Controller/user.controller.js";
import { authMiddlware } from './../Middleware/authMiddlware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/getAllUsers", getAllUsers);
router.post("/logout", authMiddlware, logout);
router.post("/userProfile", authMiddlware, userProfile);
router.post("/update", authMiddlware, update);
router.post("/changePassword", authMiddlware, changePassword);

export default router;


