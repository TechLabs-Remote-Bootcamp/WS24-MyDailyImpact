import "./Header.scss";
import logo from "../images/MDI_logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="outer-grid-container">
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="heaven-stripe"></div>
      <nav className="leaves">
        <li className="single">
          <a href="/" className="leaf-surface">
            <span>Home</span>
          </a>
          <div className="leaf-stem"></div>
        </li>
        <li className="single">
          <Link to="/about" className="leaf-surface">
            <span>About us</span>
          </Link>
          <div className="leaf-stem"></div>
        </li>
        <li className="single">
          <Link to="/community" className="leaf-surface">
            <span>Community</span>
          </Link>
          <div className="leaf-stem"></div>
        </li>
        <li className="single">
          <Link to="/login" className="leaf-surface">
            <span>Login</span>
          </Link>
          <div className="leaf-stem"></div>
        </li>
      </nav>
      <div className="plant-stem"></div>
      <div className="blossom"></div>
    </div>
  );
}
