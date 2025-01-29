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
        <div className="form-container">
          <RC_login />
          <div>
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
