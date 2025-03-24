import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import styles from "./RC_imprint.module.scss";

export default function RC_imprint() {
  return (
    <ColoredContainers h2Text="Imprint" h3Text="">
      <div className={styles["imprint-container"]}>
        <div className={styles["imprint-text"]}>
          <h5>Owners: </h5>
          <p>
            Techlabs Bootcamp team members, Vivian Sandler, Christine Stockert,
            Tomislav Varga, Vanessa Türker, Menglan Liu, A. von
            Bank, Elisabeth Prossinger, Kate Kozelkova
          </p>

          <h5>Postal address: </h5>
          <p>TechLabs e. V. Hafenweg 16 48155 Münster</p>

          <h5>Contact: </h5>
          <p>mydailyimpact@gmail.com; info@techlabs.org</p>
          <h5>Responsible for this content: </h5>
          <p>TechLabs & team members listed above</p>

          <h5>Copyright: </h5>
          <p>
            &copy;2025 MyDailyImpact &copy;2024 TechLabs; All rights reserved.
            Text, images, graphics, sounds, animations and videos as well as
            their arrangement on the website are protected by copyright and
            other protective laws. The content of this website may not be
            copied, distributed, modified, or made accessible to thrid parties
            for commercial purposes.
          </p>
        </div>
      </div>
    </ColoredContainers>
  );
}
