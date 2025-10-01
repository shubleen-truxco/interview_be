import express from "express";
import multer from "multer";
import * as applicantController from "../controller/applicants.controller.js";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const fileFilter = (req, file, cb) => {
  if (!file) cb(null, false);
  else if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images are allowed"), false);
};
const upload = multer({ storage, fileFilter });

router.post("/", upload.single("profileImage"), applicantController.createApplicant);
router.get("/", applicantController.getAllApplicants);
router.get("/id/:id", applicantController.getApplicantById);
router.get("/name/:name", applicantController.getApplicantByName);
router.delete("/id/:id", applicantController.deleteApplicant);

export default router;
