import Content_LR from "../Content_LR";
import LC_bigImage from "../LC_bigImage";
import RC_contactUs from "../RC_contactUs";
import "./ContactUs.scss";

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
