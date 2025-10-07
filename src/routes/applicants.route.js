import express from "express";
import upload from "../middleware/uploads.js";
import {
  createApplicant,
  getAllApplicants,
  getApplicantById,
  getApplicantByName,
  deleteApplicant
} from "../controller/applicants.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import {validateCreateApplicant} from "../middleware/validation.js"

const router = express.Router();

router.post("/", upload.single('photo'),validateCreateApplicant,  createApplicant); //,
router.get("/", verifyToken, getAllApplicants);
router.get("/id", getApplicantById);
router.get("/name", getApplicantByName);
router.delete("/id", deleteApplicant);

export default router;
