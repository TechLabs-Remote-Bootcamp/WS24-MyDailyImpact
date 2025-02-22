/* global process */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import countryRouter from "./routes/country.js";
import userMealLogRouter from "./routes/userMealLog.js";
import impactMetricsRouter from "./routes/impactMetrics.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();

// Connect to MongoDB
const startServer = async () => {
  try {
    await connectDB();

    // Middleware
    app.use(
      cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
      })
    );
    app.use(express.json());

    // Health check route
    app.get("/health", (req, res) => {
      res.json({ status: "ok" });
    });

    // Routes
    app.use("/auth", authRoutes);
    app.use("/api", countryRouter);
    app.use("/api/meal-logs", userMealLogRouter);
    app.use("/", impactMetricsRouter);
    // Error handling middleware
    app.use(errorHandler);

    const PORT = process.env.APP_PORT || 5000;
    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
