import React from "react";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
// import Button from "../../core/Button/Button";
import { Link } from "react-router-dom";
import styles from "./RC_Profile.module.scss";

export default function RC_Profile() {
  return (
    <div className="RC_home">
      <ColoredContainers h2Text="User profile">
        <div className={styles["user-information-container"]}>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>First Name: </span>
            <span className={styles["input"]}>Vivian</span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Last Name: </span>
            <span className={styles["input"]}>Sandler</span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Birthday: </span>
            <span className={styles["input"]}>02/18/1998</span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Gender: </span>
            <span className={styles["input"]}>Female</span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Country: </span>
            <span className={styles["input"]}>Portugal</span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Email: </span>
            <span className={styles["input"]}>vivian@mydailyimpact.com</span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Password: </span>
            <span className={styles["input"]}>12345</span>
          </li>
        </div>
      </ColoredContainers>
    </div>
  );
}
