import ImpactMetrics from "../models/ImpactMetrics.js";
import { ApiError } from "../utils/errorHandler.js";

export const getImpactMetrics = async (req, res, next) => {
    try {
        console.log("Fetching metrics for userId:", req.params.userId);
        let metrics = await ImpactMetrics.findOne({ userId: req.params.userId });
        console.log("Found metrics:", metrics);

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

        res.status(200).json({
            message: "Impact metrics fetched successfully",
            metrics,
        })
    } catch (error) {
        console.error("Error fetching impact metrics:", error);
        next(new ApiError(500, "Error fetching impact metrics:", error.message));
    }
};

export const updateImpactMetrics = async (req, res, next) => {
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

        res.status(201).json({
            message: "Impact metrics updated successfully",
            metrics,
        });
    } catch (error) {
        console.error("Error updating impact metrics:", error);
        next(new ApiError(500, "Error updating impact metrics:", error.message));
    }
};