import styles from "./Header.module.scss";
import logo from "../../../images/MDI_logo.png";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
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
                <NavLink to="/about" className={styles["leaf-surface"]}>
                  <span>About us</span>
                </NavLink>
                <div className={styles["leaf-stem"]}></div>
              </li>
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
          <Dropdown
            className={styles.menuContainer}
            show={isOpen}
            onToggle={(isOpen) => setIsOpen(isOpen)}
          >
            <Dropdown.Toggle
              variant="transparent"
              id="nav-dropdown"
              className={styles.menuButton}
            >
              ☰
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropdownMenu}>
              <Dropdown.Item
                as={NavLink}
                to="/"
                onClick={() => setIsOpen(false)}
                className={styles["dropdown-item"]}
              >
                Home
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/about"
                onClick={() => setIsOpen(false)}
                className={styles["dropdown-item"]}
              >
                About Us
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/recipeBot"
                onClick={() => setIsOpen(false)}
                className={styles["dropdown-item"]}
              >
                Recipe Bot
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/login"
                onClick={() => setIsOpen(false)}
                className={styles["dropdown-item"]}
              >
                Login
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/sign-up"
                onClick={() => setIsOpen(false)}
                className={styles["dropdown-item"]}
              >
                Sign up
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </header>
    </>
  );
}
