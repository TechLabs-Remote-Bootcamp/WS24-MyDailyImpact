// backend/models/ImpactMetrics.js
import mongoose from "mongoose";

const impactMetricsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    animalsSaved: {
      type: Number,
      default: 0,
    },
    co2Reduced: {
      type: Number,
      default: 0,
    },
    waterSaved: {
      type: Number,
      default: 0,
    },
    forestLandSaved: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ImpactMetrics = mongoose.model("ImpactMetrics", impactMetricsSchema);

export default ImpactMetrics;
