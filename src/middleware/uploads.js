import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "..", "uploads", "photos");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Upload folder created at:", uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `photo-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExt = /jpeg|jpg|png|webp/;

  const extname = allowedExt.test(path.extname(file.originalname).toLowerCase());

  const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/x-png"];
  const mimetype = allowedMimes.includes(file.mimetype.toLowerCase());

  if (extname && mimetype) {
    cb(null, true);
  } else {
    console.log("Rejected file:", file.originalname, file.mimetype);
    cb(new Error("Only JPG, PNG, and WEBP formats are allowed."));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export default upload;
