import express from "express";
import { protect } from "../middleware/auth.js";
import ImpactMetrics from "../models/ImpactMetrics.js";

const router = express.Router();

// GET user's impact metrics
router.get("/api/impact-metrics/:userId", protect, async (req, res) => {
  try {
    let metrics = await ImpactMetrics.findOne({ userId: req.params.userId });

    // If no metrics exist yet, create default metrics
    if (!metrics) {
      metrics = new ImpactMetrics({
        userId: req.params.userId,
        animalsSaved: 0,
        co2Reduced: 0,
        waterSaved: 0,
        forestLandSaved: 0,
      });
      await metrics.save();
    }

    res.json(metrics);
  } catch (error) {
    console.error("Error fetching impact metrics:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST/UPDATE user's impact metrics
router.post("/api/impact-metrics/:userId", protect, async (req, res) => {
  try {
    const { animalsSaved, co2Reduced, waterSaved, forestLandSaved } = req.body;

    let metrics = await ImpactMetrics.findOne({ userId: req.params.userId });

    if (!metrics) {
      metrics = new ImpactMetrics({
        userId: req.params.userId,
        animalsSaved,
        co2Reduced,
        waterSaved,
        forestLandSaved,
      });
    } else {
      metrics.animalsSaved = animalsSaved;
      metrics.co2Reduced = co2Reduced;
      metrics.waterSaved = waterSaved;
      metrics.forestLandSaved = forestLandSaved;
    }

    await metrics.save();

    res.json({
      message: "Impact metrics updated successfully",
      metrics,
    });
  } catch (error) {
    console.error("Error updating impact metrics:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
