import express from "express";
import {
  getImpactMetrics,
  updateImpactMetrics,
} from "../controllers/impactMetrics.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET user's impact metrics
router.get("/api/impact-metrics/:userId", protect, getImpactMetrics);
  

// POST/UPDATE user's impact metrics
router.post("/api/impact-metrics/:userId", protect, updateImpactMetrics);

export default router;
