import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import ColoredContainers from '../Colored-Containers';
import Button from '../Button';
import './Dashboard.scss'; 

export default function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <ColoredContainers
        h2Text="My Daily Impact Dashboard"
        h3Text={`Welcome, ${user.name || user.email}!`}
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
            <Button onClick={() => alert('Track a meal')}>Track Meal</Button>
            <Button onClick={() => alert('View detailed stats')}>View Stats</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </ColoredContainers>
    </div>
  );
}