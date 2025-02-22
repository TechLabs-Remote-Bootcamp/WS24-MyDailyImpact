import React, { createContext, useContext, useState, useEffect } from "react";
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

  const updateMetrics = async (mealType, userId) => {
    const impact = IMPACT_VALUES[mealType];
    const newMetrics = {
      animalsSaved: metrics.animalsSaved + impact.animalsSaved,
      co2Reduced: metrics.co2Reduced + impact.co2Reduced,
      waterSaved: metrics.waterSaved + impact.waterSaved,
      forestLandSaved: metrics.forestLandSaved + impact.forestLandSaved,
    };

    setMetrics(newMetrics);

    try {
      await api.post(`/api/impact-metrics/${userId}`, newMetrics);
    } catch (error) {
      console.error("Error saving impact metrics:", error);
    }
  };

  const loadMetrics = async (userId) => {
    try {
      const response = await api.get(`/api/impact-metrics/${userId}`);
      setMetrics(response.data);
    } catch (error) {
      console.error("Error loading impact metrics:", error);
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
