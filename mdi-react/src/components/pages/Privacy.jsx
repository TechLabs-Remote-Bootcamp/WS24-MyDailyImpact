import Content_LR from "../Content_LR";
import LC_bigImage from "../LC_bigImage";
import RC_privacy from "../RC_privacy.jsx";
import "./Privacy.scss";

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
