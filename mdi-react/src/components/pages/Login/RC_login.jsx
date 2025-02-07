import { useState, useEffect } from "react";
import { api } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import form from "../../../styles/forms.module.scss";

export default function RC_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Auth state changed - isAuthenticated:", isAuthenticated);
    // console.log("Auth state changed - user:", user);

    if (isAuthenticated && user && user.email) {
      navigate(0);
      navigate("/dashboard");
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
        <form className={form["formpage-grid"]} onSubmit={handleSubmit}>
          <section className={form.formSection}>
            <div className={form.inputSection}>
              <label className={form.label}>Email:</label>
              <input
                className={form.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={form.inputSection}>
              <label className={form.label}>Password:</label>
              <input
                className={form.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </section>
          <section className={form.buttonSection}>
            <Button type="submit">Login</Button>
          </section>
        </form>
      </ColoredContainers>
    </>
  );
}
