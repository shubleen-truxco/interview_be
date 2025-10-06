import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./models/index.js";
import applicantRoutes from "./routes/applicants.route.js";
import authRoute from "./routes/auth.route.js";
import multer from "multer";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/auth",authRoute)
app.use("/api/applicants", applicantRoutes);

// Sync all models
await db.sequelize.sync({ alter: true }); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File is too large. Maximum size is 5MB.'
      });
    }
  }
  res.status(500).json({
    success: false,
    message: error.message
  });
});


try {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ Error starting server:", err);
  process.exit(1);}