import Content_LR from "../Content_LR";
import LC_bigImage from "../LC_bigImage";
import RC_recipeBot from "../RC_recipeBot";
import "./RecipeBot.module.scss";

export default function RecipeBot() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={<RC_recipeBot />}
    />
  );
}
