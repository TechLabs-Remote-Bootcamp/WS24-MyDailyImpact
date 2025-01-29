import React from "react";
import plantyImage from "../images/RecipeBotPlanty.png";
import plantyImageBlink from "../images/RecipeBotPlantyBlink.png";
import styles from "./pages/RecipeBot.module.scss";

export default function LC_Planty() {
  return (
    <div className={styles.plantyImageContainer}>
      <img
        src={plantyImage}
        className={`${styles.plantyImageLC} ${styles.eyesOpen}`}
        alt="Green sprout character with big eyes opened"
      />
      <img
        src={plantyImageBlink}
        className={`${styles.plantyImageLC} ${styles.eyesClosed}`}
        alt="Green sprout character with big eyes closed"
      />
    </div>
  );
}
