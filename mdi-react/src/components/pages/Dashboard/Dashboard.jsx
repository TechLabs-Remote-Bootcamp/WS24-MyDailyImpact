import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useImpactMetrics } from "../../../context/ImpactMetricsContext";
import { NavLink, Navigate } from "react-router-dom";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import PigImg from "../../../images/Pig.png";
import CO2Img from "../../../images/CO2.png";
import WaterImg from "../../../images/WaterDrop.png";
import TreeImg from "../../../images/Tree.png";
import "./Dashboard.scss";

export default function Dashboard() {
  const { isAuthenticated, user, logout, loading, initializeAuth } = useAuth();
  const { metrics, loadMetrics } = useImpactMetrics();
  let userId = "";

  useEffect(() => {
    let isSubscribed = true;

    const initializeData = async () => {
      console.log(
        "Dashboard useEffect - isAuthenticated:",
        isAuthenticated,
        "user:",
        user,
        "loading:",
        loading
      );
      console.log(user);

      if (!isAuthenticated && !loading) {
        await initializeAuth();
      }

      if (isAuthenticated && user?.id && isSubscribed) {
        console.log("Loading metrics for authenticated user:", user.id);
        await loadMetrics(user.id);
      }
    };

    initializeData();

    return () => {
      isSubscribed = false;
    };
  }, [isAuthenticated, loading, initializeAuth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && !loading) {
    userId = user.id;
    console.log(userId);
  }

  const welcomeMessage = user?.firstName || user?.email || "impact fellow";

  return (
    <div className="dashboard">
      <ColoredContainers
        h2Text="My Daily Impact Dashboard"
        h3Text={`Welcome, ${welcomeMessage}!`}
      >
        <div className="dashboard-content">
          <div className="stats">
            <div className="stat-item">
              <h4>Animals Saved</h4>
              <p>{metrics.animalsSaved.toFixed(2)}</p>
              <img className="dashboard-img" src={PigImg} alt="pig" />
            </div>
            <div className="stat-item">
              <h4>CO2 Reduced (kg)</h4>
              <p>{metrics.co2Reduced.toFixed(2)}</p>
              <img className="dashboard-img" src={CO2Img} alt="C02 cloud" />
            </div>
            <div className="stat-item">
              <h4>Water Saved (L)</h4>
              <p>{metrics.waterSaved.toFixed(2)}</p>
              <img
                className="dashboard-img"
                src={WaterImg}
                alt="water droplet"
              />
            </div>
            <div className="stat-item">
              <h4>Forestland Saved (m²)</h4>
              <p>{metrics.forestLandSaved.toFixed(2)}</p>
              <img className="dashboard-img" src={TreeImg} alt="tree" />
            </div>
          </div>
          <div className="actions">
            <NavLink to="/meal-logging">
              <Button>Log Meal</Button>
            </NavLink>
            <NavLink to={"/meal-history"}>
              <Button>Meal History</Button>
            </NavLink>
          </div>
        </div>
      </ColoredContainers>
    </div>
  );
}
