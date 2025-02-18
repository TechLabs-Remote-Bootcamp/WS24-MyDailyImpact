import { useState, useEffect } from "react";
import treeworld_big from "../../../images/treeWorld1250.png";
import { GrUpload } from "react-icons/gr";
import styles from "./LC_imageUpload.module.scss";

export default function LC_imageUpload() {
  const [image, setImage] = useState("");

  return (
    <>
      <div className={styles.uploadContainer}>
        <img
          id={styles["background-image"]}
          className={styles.treeworld}
          src={treeworld_big}
          alt="A painted earth with many different trees along its circumfence line"
        />
        <div className={styles.uploadField}>
          <GrUpload className={styles.uploadIcon} />
          <p>
            Upload meal image
            <br />
            {"(optional)"}
          </p>
        </div>
      </div>
    </>
  );
}
