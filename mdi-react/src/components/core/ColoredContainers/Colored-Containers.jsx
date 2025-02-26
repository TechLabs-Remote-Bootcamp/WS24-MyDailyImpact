import styles from "./Colored-Containers.module.scss";

// 3 boxes for title (green box), subtitle (blue box) and content (textbox)

export default function ColoredContainers({ h2Text, h3Text, children }) {
  return (
    <div className={styles.colorContainer}>
      <div className={styles.greenBox}>
        <h2>{h2Text}</h2>
      </div>
      <div className={styles.blueBox}>
        <h3>{h3Text}</h3>
      </div>
      <div className={styles.textBox}>{children}</div>
    </div>
  );
}
