import { useState } from "react";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers.jsx";
import HistoryTable from "./HistoryTable.jsx";
import styles from "./HistoryTable.module.scss";

export default function MealHistory() {
  const [mealCount, setMealCount] = useState(0);
  const h3Content = (
    <>
      Here you can see all the meals you have logged.
      <br />
      Total meals: {mealCount}
    </>
  );

  // Diese Funktion wird an die Child-Komponente übergeben
  const mealCountFromTable = (data) => {
    setMealCount(data);
  };

  return (
    <div className={styles.historyContainer}>
      <ColoredContainers h2Text="Check your meal history" h3Text={h3Content}>
        <HistoryTable onDataSubmit={mealCountFromTable} />
      </ColoredContainers>
    </div>
  );
}
