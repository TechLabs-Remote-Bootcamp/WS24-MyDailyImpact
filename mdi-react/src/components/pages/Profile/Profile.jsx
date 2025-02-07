import Content_LR from "../../core/ContentLR/Content_LR.jsx";
import LC_bigImage from "../../core/LC/LC_bigImage.jsx";
import RC_Profile from "./RC_Profile.jsx"

export default function Profile() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={<RC_Profile />}
    />
  );
}
