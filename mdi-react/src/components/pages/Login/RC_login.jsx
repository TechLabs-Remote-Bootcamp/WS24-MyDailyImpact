import React, { useState, useEffect } from "react";
import { api } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ColoredContainers from "../../PageComponents/ColoredContainers/Colored-Containers";
import Button from "../../PageComponents/Button/Button";
import styles from "../../../styles/forms.module.scss";

export default function RC_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth state changed - isAuthenticated:", isAuthenticated);
    console.log("Auth state changed - user:", user);

    if (isAuthenticated && user && user.email) {
      console.log("Navigating to dashboard");
      navigate("/dashboard");
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
    <>
      <ColoredContainers
        h2Text="Your daily impact"
        h3Text="Sign in to your account"
      >
        <div>
          <form className={styles["login-form"]} onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                className={styles["input"]}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                className={styles["input"]}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <Button type="submit">Login</Button>
          </form>
        </div>
      </ColoredContainers>
    </>
  );
}