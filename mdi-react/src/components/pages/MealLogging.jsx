import Content_LR from "../Content_LR";
import LC_imageUpload from "../LC_imageUpload";
import RC_mealLog from "../RC_mealLog";

export default function MealLogging() {
  return (
    <Content_LR
      LeftComponent={<LC_imageUpload />}
      RightComponent={<RC_mealLog />}
    />
  );
}
