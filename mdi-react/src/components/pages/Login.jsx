import styles from "./Login.module.scss";
import Content_LR from "../Content_LR";
import LC_bigImage from "../LC_bigImage";
import RC_login from "../RC_login.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={
        <div className={styles["login-container"]}>
          <RC_login />
          <div className={styles["login-footer"]}>
            <p>
              New User?{" "}
              <Link to="/sign-up" className={styles["link"]}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      }
    />
  );
}
