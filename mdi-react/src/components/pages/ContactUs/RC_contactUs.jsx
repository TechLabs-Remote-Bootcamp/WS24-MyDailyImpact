import ColoredContainers from "../../core/ColoredContainers/Colored-Containers.jsx";
import styles from "./RC_contactUs.module.scss";

export default function RC_contactUs() {
  return (
    <>
      <ColoredContainers h2Text="Contact Us" h3Text="">
        <div className={styles["contact-us-container"]}>
          <h5>Do you have:</h5>
          <ul className={styles["contact-us-list"]}>
            <li>Recommendations on how to improve our app?</li>
            <li>Curious about how we came up with our calculations?</li>
            <li>Have you found our app useful?</li>
          </ul>
          <h5>Send us over an email at:</h5>
          <p>
            <a
              href="mailto:mydailyimpact@gmail.com"
              className={styles["email"]}
            >
              mydailyimpact@gmail.com
            </a>
          </p>
          <p>Looking forward to hearing from you! 🌱</p>
        </div>
      </ColoredContainers>
    </>
  );
}