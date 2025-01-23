import Content_LR from "../Content_LR";
import LC_bigImage from "../LC_bigImage";
import RC_login from "../RC_login.jsx";
import Button from "../Button.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={
        <>
          <RC_login />
          <div className="login-footer">
            <p className="sign-up-suggestion">
              New User?{" "}
              <Link to="/sign-up" className="link">
                Sign up
              </Link>
            </p>
            <Button>Log in</Button>
          </div>
        </>
      }
    />
  );
}
