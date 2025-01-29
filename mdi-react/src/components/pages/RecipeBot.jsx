import Content_LR from "../Content_LR.jsx";
import LC_Planty from "../LC_planty.jsx";
import RC_recipeBot from "../RC_recipeBot.jsx";
import "./RecipeBot.module.scss";

export default function RecipeBot() {
  return (
    <Content_LR
      LeftComponent={
        <LC_Planty rotationOn={false} overflowText="Planty the Recipe Bot" />
      }
      RightComponent={<RC_recipeBot />}
    />
  );
}
