import "./Header.scss";
import logo from "../images/mdi_logo.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header id="header-desktop" className="flower-header-grid">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="heaven-stripe"></div>
        <nav className="leaves">
          <li className="single">
            <NavLink to="/" className="leaf-surface">
              <span>Home</span>
            </NavLink>
            <div className="leaf-stem"></div>
          </li>
          <li className="single">
            <NavLink to="/about" className="leaf-surface">
              <span>About us</span>
            </NavLink>
            <div className="leaf-stem"></div>
          </li>
          <li className="single">
            <NavLink to="/recipeBot" className="leaf-surface">
              <span>Recipe Bot</span>
            </NavLink>
            <div className="leaf-stem"></div>
          </li>
          <li className="single">
            <NavLink to="/login" className="leaf-surface">
              <span>Login</span>
            </NavLink>
            <div className="leaf-stem"></div>
          </li>
          <li className="single">
            <NavLink to="/sign-up" className="leaf-surface">
              <span>Sign up</span>
            </NavLink>
            <div className="leaf-stem"></div>
          </li>
        </nav>
        <div className="plant-stem"></div>
        <div className="blossom">
          <div className="b-1"></div>
          <div className="b-2"></div>
          <div className="b-3"></div>
        </div>
      </header>
      <header id="header-mobile">
        <h2>Hello</h2>
      </header>
    </>
  );
}
