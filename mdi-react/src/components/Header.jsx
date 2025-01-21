import "./Header.scss";
import logo from "../images/mdi_logo.png";
import { Link } from "react-router-dom";

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
            <Link to="/" className="leaf-surface">
              <span>Home</span>
            </Link>
            <div className="leaf-stem"></div>
          </li>
          <li className="single">
            <Link to="/about" className="leaf-surface">
              <span>About us</span>
            </Link>
            <div className="leaf-stem"></div>
          </li>
          <li className="single">
            <Link to="/recipeBot" className="leaf-surface">
              <span>Recipe Bot</span>
            </Link>
            <div className="leaf-stem"></div>
          </li>
          <li className="single">
            <Link to="/login" className="leaf-surface">
              <span>Login</span>
            </Link>
            <div className="leaf-stem"></div>
          </li>
          <li className="single">
            <Link to="/sign-up" className="leaf-surface">
              <span>Sign up</span>
            </Link>
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
