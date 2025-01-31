import Content_LR from "../../core/ContentLR/Content_LR.jsx";
import LC_bigImage from "../../core/LC/LC_bigImage.jsx";
import RC_contactUs from "./RC_contactUs.jsx";

export default function ContactUs() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={<RC_contactUs />}
    />
  );
}
