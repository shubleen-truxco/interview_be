import express from "express";
import upload from "../middleware/uploads.js";
import {
  createApplicant,
  getAllApplicants,
  getApplicantById,
  getApplicantByName,
  deleteApplicant
} from "../controller/applicants.controller.js";
// import {validateCreateApplicant} from "../middleware/validation.js"

const router = express.Router();

router.post("/test", upload.single('photo'), (req, res) => {
  console.log("REQ.BODY:", req.body);
  console.log("REQ.FILE:", req.file);
  res.send({ body: req.body, file: req.file });
});

router.post("/", upload.single('photo'),  createApplicant); //validateCreateApplicant,
router.get("/", getAllApplicants);
router.get("/id", getApplicantById);
router.get("/name", getApplicantByName);
router.delete("/id", deleteApplicant);

export default router;
