import plantyImage from "../images/RecipeBotPlanty.png";
import styles from "./pages/RecipeBot.module.scss";

export default function LC_Planty({ props }) {
  return (
    <div>
      <img
        src={plantyImage}
        className={styles["planty-image"]}
        alt="Green sprout character with bigeyes"
      />
    </div>
  );
}
