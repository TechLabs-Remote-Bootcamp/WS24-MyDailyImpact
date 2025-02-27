import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import styles from "./RC_privacy.module.scss";

export default function RC_privacy() {
  return (
    <ColoredContainers h2Text="Privacy Policy for MyDailyImpact" h3Text="">
      <div className={styles["privacy-container"]}>
        <div className={styles["privacy-text"]}>
          <p>Last Updated: February 21, 2025</p>
          <p>
            MyDailyImpact {`(we, our or us)`} is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our application.
          </p>
          <h5>We Collect the following type of information</h5>
          <ul>
            <li>Full Name</li>
            <li>Birthday</li>
            <li>Gender</li>
            <li>Country</li>
            <li>Email Address</li>
            <li>Meal Logging Data</li>
          </ul>
          <p>
            We collect this information to create your personal account and to
            have a better idea of the demographics utilizing our app.
          </p>
          <p>
            Meal logging data is used to find your impact calculations in the
            following areas:
          </p>
          <ul>
            <li>Animal Lives Saved</li>
            <li>CO2 Emissions Saved</li>
            <li>Water Saved</li>
            <li>Forest Land Saved</li>
          </ul>

          <h5>How we use your information</h5>
          <p>
            Your meal logging data is used to calculate and display your animal
            and environmental impact metrics
          </p>

          <h5>Data Storage and Security</h5>
          <p>
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, or disclosure.
            Your data is stored securely and we retain it only for as long as
            necessary to provide our services or comply with legal obligations.
            You can delete your account at any time.
          </p>

          <h5>Information Sharing</h5>
          <p>
            We do not sell your personal data to third parties. We may share
            anonymous, aggregated data for research or educational purposes
            within the{" "}
            <a href="https://www.techlabs.org/" target="_blank">
              TechLabs
            </a>{" "}
            community.
          </p>

          <h5>Your Rights</h5>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct or update your personal data</li>
            <li>Delete your account and associated data</li>
          </ul>

          <h5>Changes to Privacy Policy</h5>
          <p>
            We may update this Privacy Policy periodically. We will notify you
            of any material changes through the app or via email.
          </p>

          <h5>Contact Us</h5>
          <p>
            For questions about this Privacy Policy or your personal data,
            please contact us at:
            <a href="mailto:mydailyimpact@gmail.com">
              {" "}
              mydailyimpact@gmail.com
            </a>
          </p>

          <p>
            This app was created as an educational project at TechLabs,
            combining contributions from Frontend, Backend, AI/Deep Learning,
            and Data Science students.
          </p>
        </div>
      </div>
    </ColoredContainers>
  );
}
