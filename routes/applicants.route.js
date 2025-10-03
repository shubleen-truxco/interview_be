import express from "express";
import upload from "../middleware/uploads.js";
import {
  createApplicant,
  getAllApplicants,
  getApplicantById,
  getApplicantByName,
  deleteApplicant
} from "../controller/applicants.controller.js";


const router = express.Router();



router.post("/",  upload.single('photo'), createApplicant);
router.get("/", getAllApplicants);
router.get("/id", getApplicantById);
router.get("/name", getApplicantByName);
router.delete("/id", deleteApplicant);

export default router;
