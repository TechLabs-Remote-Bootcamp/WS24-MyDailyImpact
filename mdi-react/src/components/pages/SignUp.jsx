import Content_LR from "../Content_LR.jsx";
import LC_bigImage from "../LC_bigImage.jsx";
import RC_signup from "../RC_signup.jsx";
import Button from "../Button.jsx";

export default function Signup() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={
        <>
          <RC_signup />
          <Button>Sign up</Button>
        </>
      }
    />
  );
}
