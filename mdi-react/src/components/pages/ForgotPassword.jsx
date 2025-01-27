import Content_LR from "../Content_LR";
import LC_bigImage from "../LC_bigImage";
import RC_forgotPassword from "../RC_forgotPassword.jsx";

export default function ForgotPassword() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={<RC_forgotPassword />}
    />
  );
}
