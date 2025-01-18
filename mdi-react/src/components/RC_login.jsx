import React, { useState } from "react";
import { api } from "../utils/api";
import ColoredContainers from './Colored-Containers';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from "react-router-dom";


export default function RC_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, user, login } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login({ email, password });
      console.log("Login successful", response);
      await login({ email, password });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-container">
      <ColoredContainers
        h2Text="Your daily impact"
        h3Text="Sign in to your account"
      >
        <div className="login-form">
          <form className="form log-in" onSubmit={handleSubmit}>
            <input
              className="email input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="password input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </ColoredContainers>
    </div>
  );
}
