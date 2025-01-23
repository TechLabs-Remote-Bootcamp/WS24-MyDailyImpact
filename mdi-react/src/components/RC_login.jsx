import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import ColoredContainers from './Colored-Containers';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import "./Colored-Containers.module.scss";

export default function RC_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Auth state changed - isAuthenticated:', isAuthenticated);
    console.log('Auth state changed - user:', user);

    if (isAuthenticated && user && user.email) {
      console.log('Navigating to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log("Login API response:", response);
      
      /* if (response && response.token && response.user) {
        const success = await login(response.token, response.user);
        if (success) {
          console.log('Login successful');
        } else {
          console.log('Login failed in useAuth');
        }
      } else {
        console.error("Invalid login response format");
      } */
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <ColoredContainers
        h2Text="Your daily impact"
        h3Text="Sign in to your account"
      >
        <div className="login-form">
          <form className="form log-in" onSubmit={handleSubmit}>
            <label className="input-label">
              Email:
              <input
                className="email login-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input-label">
              Password:
              <input
                className="password input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      </ColoredContainers>
    </div>
  );
}