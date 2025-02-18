import Content_LR from "../../core/ContentLR/Content_LR";
import LC_imageUpload from "../../core/LC/LC_imageUpload";
import LC_bigImage from "../../core/LC/LC_bigImage";
import RC_mealLog from "./RC_mealLog";

export default function MealLogging() {
  return (
    <Content_LR
      LeftComponent={<LC_bigImage />}
      RightComponent={<RC_mealLog />}
    />
  );
}
