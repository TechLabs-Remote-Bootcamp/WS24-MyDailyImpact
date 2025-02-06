import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import "./Dashboard.scss";

export default function Dashboard() {
  const { isAuthenticated, user, logout, loading, initializeAuth } = useAuth();

  useEffect(() => {
    console.log(
      "Dashboard useEffect - isAuthenticated:",
      isAuthenticated,
      "user:",
      user,
      "loading:",
      loading
    );
    if (!isAuthenticated && !loading) {
      initializeAuth();
    }
  }, [isAuthenticated, loading, initializeAuth, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const welcomeMessage = user?.firstName || user?.email || "User";

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
              <p>23</p>
            </div>
            <div className="stat-item">
              <h4>CO2 Reduced (kg)</h4>
              <p>156</p>
            </div>
            <div className="stat-item">
              <h4>Water Saved (L)</h4>
              <p>3,450</p>
            </div>
            <div className="stat-item">
              <h4>Forest Land Saved (m²)</h4>
              <p>78</p>
            </div>
          </div>
          <div className="actions">
            <Button onClick={() => alert("Track a meal")}>Track Meal</Button>
            <Button onClick={() => alert("View detailed stats")}>
              View Stats
            </Button>
          </div>
        </div>
      </ColoredContainers>
    </div>
  );
}
