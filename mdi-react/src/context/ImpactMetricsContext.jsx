import React, { createContext, useContext, useState } from "react";
import { api } from "../utils/api";

// Create context for impact metrics
const ImpactMetricsContext = createContext();

// Impact values based on meal type
const IMPACT_VALUES = {
  Breakfast: {
    animalsSaved: 0.01,
    co2Reduced: 4.3,
    waterSaved: 447.17,
    forestLandSaved: 10.7,
  },
  Lunch: {
    animalsSaved: 0.07,
    co2Reduced: 5.4,
    waterSaved: 894.33,
    forestLandSaved: 13.4,
  },
  Dinner: {
    animalsSaved: 0.07,
    co2Reduced: 5.4,
    waterSaved: 894.33,
    forestLandSaved: 13.4,
  },
};

export function ImpactMetricsProvider({ children }) {
  const [metrics, setMetrics] = useState({
    animalsSaved: 0,
    co2Reduced: 0,
    waterSaved: 0,
    forestLandSaved: 0,
  });

  const loadMetrics = async (userId) => {
    try {
      console.log("Loading metrics for user:", userId);
      const response = await api.get(`/api/impact-metrics/${userId}`);
      console.log("Raw response:", response);
      console.log("Loaded metrics:", response.data);

      if (response) {
        // The metrics are directly in the response since that's how we send them from the backend
        setMetrics({
          animalsSaved: Number(response.animalsSaved) || 0,
          co2Reduced: Number(response.co2Reduced) || 0,
          waterSaved: Number(response.waterSaved) || 0,
          forestLandSaved: Number(response.forestLandSaved) || 0,
        });
        console.log("Metrics set to:", metrics); // Add this line to debug
      }
    } catch (error) {
      console.error("Error loading impact metrics:", error);
    }
  };

  const updateMetrics = async (mealType, userId) => {
    try {
      const impact = IMPACT_VALUES[mealType];
      const newMetrics = {
        animalsSaved: Number(metrics.animalsSaved) + impact.animalsSaved,
        co2Reduced: Number(metrics.co2Reduced) + impact.co2Reduced,
        waterSaved: Number(metrics.waterSaved) + impact.waterSaved,
        forestLandSaved:
          Number(metrics.forestLandSaved) + impact.forestLandSaved,
      };

      const response = await api.post(
        `/api/impact-metrics/${userId}`,
        newMetrics
      );
      console.log("Update response:", response);
      if (response && response.metrics) {
        setMetrics(response.metrics);
      } else {
        setMetrics(newMetrics);
      }
    } catch (error) {
      console.error("Error updating impact metrics:", error);
    }
  };

  return (
    <ImpactMetricsContext.Provider
      value={{ metrics, updateMetrics, loadMetrics }}
    >
      {children}
    </ImpactMetricsContext.Provider>
  );
}

export const useImpactMetrics = () => {
  const context = useContext(ImpactMetricsContext);
  if (!context) {
    throw new Error(
      "useImpactMetrics must be used within an ImpactMetricsProvider"
    );
  }
  return context;
};
