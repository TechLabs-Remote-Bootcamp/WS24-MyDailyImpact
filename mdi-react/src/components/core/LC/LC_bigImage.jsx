import treeworld_big from "../../../images/treeWorld1250.png";
import styles from "./LC_bigImage.module.scss";

function LC_bigImage({ props }) {
  return (
    <div className={styles.imageContainer}>
      <img
        id={styles["treeWorld"]}
        className={styles["image-box"]}
        src={treeworld_big}
        alt="A painted earth with many different trees along its circumfence line"
      />
    </div>
  );
}

export default LC_bigImage;
