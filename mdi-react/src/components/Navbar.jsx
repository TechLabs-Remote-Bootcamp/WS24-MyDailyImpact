import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.blossom}>
        <div className={styles["b-1"]}></div>
        <div className={styles["b-2"]}></div>
        <div className={styles["b-3"]}></div>
      </div>
      <nav className={styles.navbar}>
        <div className={styles["plant-stem"]}></div>
        <NavLink to="/" className={styles.single}>
          <span>Home</span>
        </NavLink>
        <div className={styles["plant-stem"]}></div>
        <NavLink to="/about" className={styles.single}>
          <span>About us</span>
        </NavLink>
        <div className={styles["plant-stem"]}></div>
        <NavLink to="/recipeBot" className={styles.single}>
          <span>Recipe Bot</span>
        </NavLink>
        <div className={styles["plant-stem"]}></div>
        <NavLink to="/login" className={styles.single}>
          <span>Login</span>
        </NavLink>

        <div className={styles["plant-stem"]}></div>
      </nav>
    </div>
  );
}
