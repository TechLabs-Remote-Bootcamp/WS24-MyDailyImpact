import styles from "./Footer.module.scss";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} MyDailyImpact
      </div>
      <nav>
        <ul className={styles["footer-links"]}>
          <NavLink to="/contact-us">
            <li className={styles["footer-nav-item"]}>Contact</li>
          </NavLink>
          <NavLink to="/imprint">
            <li className={styles["footer-nav-item"]}>Imprint</li>
          </NavLink>
          <NavLink to="/privacy">
            <li className={styles["footer-nav-item"]}>Privacy</li>
          </NavLink>
        </ul>
      </nav>
    </footer>
  );
}
