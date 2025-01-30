import Content_LR from "../../PageComponents/ContentLR/Content_LR.jsx";
import LC_bigImage from "../../PageComponents/LC/LC_bigImage.jsx";
import RC_privacy from "./RC_privacy.jsx";
import "./Privacy.module.scss";

export default function Privacy() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={<RC_privacy />}
    />
  );
}
