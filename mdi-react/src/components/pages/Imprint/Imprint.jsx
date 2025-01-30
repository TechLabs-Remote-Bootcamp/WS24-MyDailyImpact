import Content_LR from "../../PageComponents/ContentLR/Content_LR.jsx";
import LC_bigImage from "../../PageComponents/LC/LC_bigImage.jsx";
import RC_imprint from "./RC_imprint.jsx";

export default function Imprint() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={<RC_imprint />}
    />
  );
}
