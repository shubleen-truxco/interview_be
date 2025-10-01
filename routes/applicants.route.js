import express from "express";
import upload from "../middleware/uploads.js";
import * as applicantController from "../controller/applicants.controller.js";


const router = express.Router();



router.post("/",  upload.single('photo'), applicantController.createApplicant);
router.get("/", applicantController.getAllApplicants);
router.get("/id/:id", applicantController.getApplicantById);
router.get("/name/:name", applicantController.getApplicantByName);
router.delete("/id/:id", applicantController.deleteApplicant);

export default router;
