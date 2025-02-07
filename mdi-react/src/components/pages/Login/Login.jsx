import styles from "./Login.module.scss";
import Content_LR from "../../core/ContentLR/Content_LR.jsx";
import LC_bigImage from "../../core/LC/LC_bigImage.jsx";
import RC_login from "./RC_login.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={
        <div className={styles["login-form-container"]}>
          <RC_login />
          <div className={styles.additionalLinks}>
            <p>
              <span>
                New here? Join us and{" "}
                <Link className={styles.link} to="/sign-up">
                  sign up!
                </Link>
              </span>
            </p>
            <p>
              <Link className={styles.link} to="/forgot-password">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      }
    />
  );
}
