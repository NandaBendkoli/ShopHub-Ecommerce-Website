import express from "express";

import { createUserType, getAllUserTypes } from "../Controller/userType.controller.js";

const router = express.Router();

router.post("/createUserType", createUserType);
router.get("/getAllUserTypes", getAllUserTypes);

export default router;