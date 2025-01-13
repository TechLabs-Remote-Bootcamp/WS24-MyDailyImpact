import "./Footer.scss";
import { Link } from "react-router-dom";

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
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/imprint">Imprint</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/privacy">Privacy</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
