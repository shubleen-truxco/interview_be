import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./models/index.js";
import applicantRoutes from "./routes/applicants.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sync all models
await db.sequelize.sync({ alter: true }); 

// Routes
app.use("/api/applicants", applicantRoutes);

try {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ Error starting server:", err);
  process.exit(1);}