import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderNotLoggedIn from "./HeaderNotLoggedIn";

const Header = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { isAuthenticated, user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      setIsUserAuthenticated(isAuthenticated && user !== null);
    }
  }, [isAuthenticated, user, loading]);

  if (loading) {
    return null;
  }
  
  return isUserAuthenticated ? <HeaderLoggedIn /> : <HeaderNotLoggedIn />;
};

export default Header;

// import styles from "./Header.module.scss";
// import logo from "../../../images/MDI_logo.png";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Dropdown } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useAuth } from "../../../hooks/useAuth";

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { isAuthenticated, user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [authState, setAuthState] = useState(isAuthenticated);

//   useEffect(() => {
//     setAuthState(isAuthenticated);
//   }, [isAuthenticated]);

//   const renderNavItems = () => {
//     if (authState) {
//       return (
//         <>
//           <li className={styles.single}>
//             <NavLink to="/dashboard" className={styles["leaf-surface"]}>
//               <span>Dashboard</span>
//             </NavLink>
//             <div className={styles["leaf-stem"]}></div>
//           </li>
//           <li className={styles.single}>
//             <NavLink to="/meal-log" className={styles["leaf-surface"]}>
//               <span>Log a Meal</span>
//             </NavLink>
//             <div className={styles["leaf-stem"]}></div>
//           </li>
//           <li className={styles.single}>
//             <NavLink to="/meal-history" className={styles["leaf-surface"]}>
//               <span>Meal History</span>
//             </NavLink>
//             <div className={styles["leaf-stem"]}></div>
//           </li>
//           <li className={styles.single}>
//             <NavLink to="/recipeBot" className={styles["leaf-surface"]}>
//               <span>Recipe Bot</span>
//             </NavLink>
//             <div className={styles["leaf-stem"]}></div>
//           </li>
//           <li className={styles.single}>
//             <NavLink to="/profile" className={styles["leaf-surface"]}>
//               <span>Profile</span>
//             </NavLink>
//             <div className={styles["leaf-stem"]}></div>
//           </li>
//         </>
//       );
//     }
//     return (
//       <>
//         <li className={styles.single}>
//           <NavLink to="/" className={styles["leaf-surface"]}>
//             <span>Home</span>
//           </NavLink>
//           <div className={styles["leaf-stem"]}></div>
//         </li>
//         <li className={styles.single}>
//           <NavLink to="/about" className={styles["leaf-surface"]}>
//             <span>About us</span>
//           </NavLink>
//           <div className={styles["leaf-stem"]}></div>
//         </li>
//         <li className={styles.single}>
//           <NavLink to="/recipeBot" className={styles["leaf-surface"]}>
//             <span>Recipe Bot</span>
//           </NavLink>
//           <div className={styles["leaf-stem"]}></div>
//         </li>
//         <li className={styles.single}>
//           <NavLink to="/login" className={styles["leaf-surface"]}>
//             <span>Login</span>
//           </NavLink>
//           <div className={styles["leaf-stem"]}></div>
//         </li>
//         <li className={styles.single}>
//           <NavLink to="/sign-up" className={styles["leaf-surface"]}>
//             <span>Sign up</span>
//           </NavLink>
//           <div className={styles["leaf-stem"]}></div>
//         </li>
//       </>
//     );
//   };

//   const renderDropdownItems = () => {
//     if (authState) {
//       return (
//         <>
//           <Dropdown.Item
//             as={NavLink}
//             to="/dashboard"
//             onClick={() => setIsOpen(false)}
//             className={styles["dropdown-item"]}
//           >
//             Dashboard
//           </Dropdown.Item>
//           <Dropdown.Item
//             as={NavLink}
//             to="/meal-log"
//             onClick={() => setIsOpen(false)}
//             className={styles["dropdown-item"]}
//           >
//             Log a Meal
//           </Dropdown.Item>
//           <Dropdown.Item
//             as={NavLink}
//             to="/meal-history"
//             onClick={() => setIsOpen(false)}
//             className={styles["dropdown-item"]}
//           >
//             Meal History
//           </Dropdown.Item>
//           <Dropdown.Item
//             as={NavLink}
//             to="/recipeBot"
//             onClick={() => setIsOpen(false)}
//             className={styles["dropdown-item"]}
//           >
//             Recipe Bot
//           </Dropdown.Item>
//           <Dropdown.Item
//             as={NavLink}
//             to="/profile"
//             onClick={() => setIsOpen(false)}
//             className={styles["dropdown-item"]}
//           >
//             Profile
//           </Dropdown.Item>
//         </>
//       );
//     }
//     return (
//       <>
//         <Dropdown.Item
//           as={NavLink}
//           to="/"
//           onClick={() => setIsOpen(false)}
//           className={styles["dropdown-item"]}
//         >
//           Home
//         </Dropdown.Item>
//         <Dropdown.Item
//           as={NavLink}
//           to="/about"
//           onClick={() => setIsOpen(false)}
//           className={styles["dropdown-item"]}
//         >
//           About Us
//         </Dropdown.Item>
//         <Dropdown.Item
//           as={NavLink}
//           to="/recipeBot"
//           onClick={() => setIsOpen(false)}
//           className={styles["dropdown-item"]}
//         >
//           Recipe Bot
//         </Dropdown.Item>
//         <Dropdown.Item
//           as={NavLink}
//           to="/login"
//           onClick={() => setIsOpen(false)}
//           className={styles["dropdown-item"]}
//         >
//           Login
//         </Dropdown.Item>
//         <Dropdown.Item
//           as={NavLink}
//           to="/sign-up"
//           onClick={() => setIsOpen(false)}
//           className={styles["dropdown-item"]}
//         >
//           Sign up
//         </Dropdown.Item>
//       </>
//     );
//   };

//   return (
//     <>
//       <header id={styles["header-desktop"]}>
//         <div className={styles.desktopHead}>
//           <div className={styles["flower-header-grid"]}>
//             <NavLink to="/" className={styles.logo}>
//               <img src={logo} alt="logo" />
//             </NavLink>
//             <div className={styles["heaven-stripe"]}></div>
//             <nav className={styles.leaves}>{renderNavItems()}</nav>
//             <div className={styles["plant-stem"]}></div>
//             <div className={styles.blossom}>
//               <div className={styles["b-1"]}></div>
//               <div className={styles["b-2"]}></div>
//               <div className={styles["b-3"]}></div>
//             </div>
//           </div>
//         </div>
//       </header>
//       <header id={styles["header-mobile"]}>
//         <div className={styles.desktopMobile}>
//           <Dropdown
//             className={styles.menuContainer}
//             show={isOpen}
//             onToggle={(isOpen) => setIsOpen(isOpen)}
//           >
//             <Dropdown.Toggle
//               variant="transparent"
//               id="nav-dropdown"
//               className={styles.menuButton}
//             >
//               ☰
//             </Dropdown.Toggle>

//             <Dropdown.Menu className={styles.dropdownMenu}>
//               {renderDropdownItems()}
//             </Dropdown.Menu>
//           </Dropdown>

//           <NavLink to="/" className={styles.logo}>
//             <img src={logo} alt="logo" />
//           </NavLink>
//         </div>
//       </header>
//     </>
//   );
// }
