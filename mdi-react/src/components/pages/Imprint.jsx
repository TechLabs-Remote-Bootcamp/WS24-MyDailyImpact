import Content_LR from "../Content_LR";
import LC_bigImage from "../LC_bigImage";
import RC_imprint from "../RC_imprint.jsx";
import "./Imprint.scss";

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
