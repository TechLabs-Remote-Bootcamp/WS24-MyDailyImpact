import { useState } from "react";
import { KeyRound, Mail, Loader2 } from "lucide-react";
import styles from "./LoginForm.module.scss";

export function LoginForm({ onSubmit, onShowRegister, loading, error }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <div className={styles.inputWrapper}>
          <Mail className={styles.icon} />
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <div className={styles.inputWrapper}>
          <KeyRound className={styles.icon} />
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
      </div>

      <div className={styles.rememberMe}>
        <div className={styles.checkbox}>
          <input
            id="remember-me"
            type="checkbox"
            checked={credentials.rememberMe}
            onChange={(e) =>
              setCredentials({ ...credentials, rememberMe: e.target.checked })
            }
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <a href="#" className={styles.forgotPassword}>
          Forgot password?
        </a>
      </div>

      {error && (
        <div className={styles.error}>
          <div>{error}</div>
        </div>
      )}

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? (
          <>
            <Loader2 className={styles.spinner} />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>

      <div className={styles.switchMode}>
        <button
          type="button"
          onClick={onShowRegister}
          className={styles.switchButton}
        >
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );
}
