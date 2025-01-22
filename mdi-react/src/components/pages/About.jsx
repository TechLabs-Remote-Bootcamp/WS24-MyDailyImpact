import Content_LR from "../Content_LR";
import LC_bigImage from "../LC_bigImage";
import RC_about from "../RC_about.jsx";

export default function Login() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={<RC_about />}
    />
  );
}
