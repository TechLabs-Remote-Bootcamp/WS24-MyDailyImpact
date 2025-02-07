import React, { useState, useEffect } from "react";
import { api } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import styles from "../../../styles/forms.module.scss";

export default function RC_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Auth state changed - isAuthenticated:", isAuthenticated);
    // console.log("Auth state changed - user:", user);

    if (isAuthenticated && user && user.email) {
      navigate("/dashboard");
      navigate(0);
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response && response.success) {
        console.log("Login successful");
        // setIsUserAuthenticated(true);
        // navigate("/dashboard")
      }
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
