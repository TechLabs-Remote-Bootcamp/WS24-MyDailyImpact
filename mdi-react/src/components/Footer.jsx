import "./Footer.scss";

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
              <a href="">Contact Us</a>
            </li>
            <li className="footer-nav-item">
              <a href="">Imprint</a>
            </li>
            <li className="footer-nav-item">
              <a href="">Privacy</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
