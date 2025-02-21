import Content_LR from "../../core/ContentLR/Content_LR.jsx";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers.jsx";
import LC_bigImage from "../../core/LC/LC_bigImage.jsx";
import HistoryTable from "./HistoryTable.jsx";
import styles from "./HistoryTable.module.scss";

export default function MealHistory() {
  return (
    <div className={styles.historyContainer}>
      <ColoredContainers
        h2Text="Check your meal history"
        h3Text="Here you can see all the meals you have logged."
      >
        <HistoryTable />
      </ColoredContainers>
    </div>
  );
}
