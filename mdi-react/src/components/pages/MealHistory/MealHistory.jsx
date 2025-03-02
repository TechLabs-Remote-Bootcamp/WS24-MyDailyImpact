import ColoredContainers from "../../core/ColoredContainers/Colored-Containers.jsx";
import HistoryTable from "./HistoryTable.jsx";
import styles from "./HistoryTable.module.scss";

export default function MealHistory() {
  // If there would be the need for more design controlled content text in the blue box at some point later
  //   just comment in the lines and adjust the text or implement analogue to the green box
  const h3Content = (
    <>
      Here you can see all the meals you have logged.
      {/* <br />
      It is possible to edit and delete logs. */}
    </>
  );

  return (
    <div className={styles.historyContainer}>
      <ColoredContainers h2Text="Check your meal history" h3Text={h3Content}>
        <HistoryTable />
      </ColoredContainers>
    </div>
  );
}
