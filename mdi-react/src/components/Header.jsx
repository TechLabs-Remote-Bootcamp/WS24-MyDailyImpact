import styles from "./Header.module.scss";
import logo from "../images/mdi_logo.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header id={styles["header-desktop"]}>
        <div className={styles.desktopHead}>
          <div className={styles["flower-header-grid"]}>
            <div className={styles.logo}>
              <img src={logo} />
            </div>
            <div className={styles["heaven-stripe"]}></div>
            <nav className={styles.leaves}>
              <li className={styles.single}>
                <NavLink to="/" className={styles["leaf-surface"]}>
                  <span>Home</span>
                </NavLink>
                <div className={styles["leaf-stem"]}></div>
              </li>
              <li className={styles.single}>
                <NavLink to="/meal-logging" className={styles["leaf-surface"]}>
                  <span>Meal Log</span>
                </NavLink>
                <div className={styles["leaf-stem"]}></div>
              </li>
              {/* <li className={styles.single}>
                <NavLink to="/about" className={styles["leaf-surface"]}>
                  <span>About us</span>
                </NavLink>
                <div className={styles["leaf-stem"]}></div>
              </li> */}
              <li className={styles.single}>
                <NavLink to="/recipeBot" className={styles["leaf-surface"]}>
                  <span>Recipe Bot</span>
                </NavLink>
                <div className={styles["leaf-stem"]}></div>
              </li>
              <li className={styles.single}>
                <NavLink to="/login" className={styles["leaf-surface"]}>
                  <span>Login</span>
                </NavLink>
                <div className={styles["leaf-stem"]}></div>
              </li>
              <li className={styles.single}>
                <NavLink to="/sign-up" className={styles["leaf-surface"]}>
                  <span>Sign up</span>
                </NavLink>
                <div className={styles["leaf-stem"]}></div>
              </li>
            </nav>
            <div className={styles["plant-stem"]}></div>
            <div className={styles.blossom}>
              <div className={styles["b-1"]}></div>
              <div className={styles["b-2"]}></div>
              <div className={styles["b-3"]}></div>
            </div>
          </div>
        </div>
      </header>
      <header id={styles["header-mobile"]}>
        <div className={styles.desktopMobile}>
          <div></div>
          <div className={styles.logo}>
            <img src={logo} />
          </div>
          <nav className={styles.userLinks}>
            <li className={styles.single}>
              <NavLink to="/login" className="">
                <span>Login</span>
              </NavLink>
            </li>
            <li className={styles.single}>
              <NavLink to="/sign-up" className="">
                <span>Sign up</span>
              </NavLink>
            </li>
          </nav>
        </div>
      </header>
    </>
  );
}
