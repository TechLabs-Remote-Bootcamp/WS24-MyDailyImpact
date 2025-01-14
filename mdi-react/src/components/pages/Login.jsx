import "./Login.scss";
import Content_LR from "../Content_LR";
import LC_bigImage from "../LC_bigImage";
import RC_login from "../RC_login.jsx";
import Button from "../Button.jsx";

export default function Login() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent= {
      <>
      <RC_login />
      <Button>Log in</Button>
      </>
      }
      />
  );
}
