import treeworld_big from "../images/treeWorld1250.png";
import styles from "./LC_imageUpload.module.scss";

function LC_imageUpload({ props }) {
  return (
    <>
      <img
        id={styles["treeWorld"]}
        className={styles["image-box"]}
        src={treeworld_big}
        alt="A painted earth with many different trees along its circumfence line"
      />
    </>
  );
}

export default LC_bigImage;
