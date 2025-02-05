import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import PigImg from "../../../images/Pig.png";
import CO2Img from "../../../images/CO2.png";
import WaterImg from "../../../images/WaterDrop.png";
import TreeImg from "../../../images/Tree.png";
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

  const handleLogout = () => {
    logout();
  };

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
              <img className="dashboard-img" src={PigImg} alt="pig" />
            </div>
            <div className="stat-item">
              <h4>CO2 Reduced (kg)</h4>
              <p>156</p>
              <img className="dashboard-img" src={CO2Img} alt="pig" />
            </div>
            <div className="stat-item">
              <h4>Water Saved (L)</h4>
              <p>3,450</p>
              <img className="dashboard-img" src={WaterImg} alt="pig" />
            </div>
            <div className="stat-item">
              <h4>Forest Land Saved (m²)</h4>
              <p>78</p>
              <img className="dashboard-img" src={TreeImg} alt="pig" />
            </div>
          </div>
          <div className="actions">
            <Button onClick={() => alert("Track a meal")}>Track Meal</Button>
            <Button onClick={() => alert("View detailed stats")}>
              View Stats
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </ColoredContainers>
    </div>
  );
}
