import Content_LR from "../../core/ContentLR/Content_LR.jsx"
import LC_bigImage from "../../core/LC/LC_bigImage.jsx";
import RC_about from "./RC_about.jsx";

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
