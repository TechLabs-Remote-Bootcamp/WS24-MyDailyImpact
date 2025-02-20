import Content_LR from "../../core/ContentLR/Content_LR.jsx";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers.jsx";
import LC_bigImage from "../../core/LC/LC_bigImage.jsx";
import HistoryTable from "./HistoryTable.jsx";

export default function MealHistory() {
  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={
        <ColoredContainers
          h2Text="Check your meal history"
          h3Text="Here you can see all the meals you have logged."
        >
          <HistoryTable />
        </ColoredContainers>
      }
    />
  );
}
