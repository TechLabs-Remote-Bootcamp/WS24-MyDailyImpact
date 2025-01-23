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
          <li className={styles["footer-nav-item"]}>
            <NavLink to="/contact-us">Contact</NavLink>
          </li>
          <li className={styles["footer-nav-item"]}>
            <NavLink to="/imprint">Imprint</NavLink>
          </li>
          <li className={styles["footer-nav-item"]}>
            <NavLink to="/privacy">Privacy</NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
