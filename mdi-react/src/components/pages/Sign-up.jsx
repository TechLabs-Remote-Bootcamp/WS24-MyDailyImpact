import "./Sign-up.scss";
import Content_LR from "../Content_LR.jsx";
import LC_bigImage from "../LC_bigImage.jsx";
import RC_login from "../RC_login.jsx";
import Button from "../Button.jsx";


export default function SignUp() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={
        <>
          <RC_login />
          <Button>Sign up</Button>
        </>
      }
    />
  );
}
