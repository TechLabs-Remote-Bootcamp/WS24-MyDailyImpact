import "./Footer.scss";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          &copy; {new Date().getFullYear()} MyDailyImpact
        </p>
        <nav>
          <ul className="footer-nav">
            <li className="footer-nav-item">
              <NavLink to="/contact-us">Contact Us</NavLink>
            </li>
            <li className="footer-nav-item">
              <NavLink to="/imprint">Imprint</NavLink>
            </li>
            <li className="footer-nav-item">
              <NavLink to="/privacy">Privacy</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
