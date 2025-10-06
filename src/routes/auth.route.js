import express from "express";
import { loginAdmin, registerAdmin } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

export default router;
