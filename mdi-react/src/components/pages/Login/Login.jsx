import styles from "./Login.module.scss";
import Content_LR from "../../core/ContentLR/Content_LR.jsx";
import LC_bigImage from "../../core/LC/LC_bigImage.jsx";
import RC_login from "./RC_login.jsx";
import { Link } from "react-router-dom";
//import form from "../../styles/forms.module.scss";

export default function Login() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={
        <div className={styles["login-form-container"]}>
          <RC_login />
          <div className={styles["login-extra-info"]}>
            <p>
              New User? <Link to="/sign-up">Sign up</Link>
            </p>
            <p>
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </div>
        </div>
      }
    />
  );
}
