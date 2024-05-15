import "../styles/footer.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { HashLink as Link } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="logo-col">
          <img src="/logo.png" alt="Logo" className="logo" />
        </div>
        <div className="services-col">
          <h3>Services</h3>
          <ul>
            <Link to="#login" smooth className="login-footer">
              <li>Login</li>
            </Link>
            <Link to="#about" smooth className="about-footer">
              <li>About TimeOFF</li>
            </Link>
            <Link to="#pricing" smooth className="prices-footer">
              <li>Prices</li>
            </Link>
          </ul>
        </div>
        <div className="contact-col" id="contact">
          <h3>Contact Us</h3>
          <ul>
            <Link
              to="https://maps.app.goo.gl/EQaRscdQ6dU7i1aC9"
              target="_blank"
              smooth
              className="address-footer"
            >
              <li>
                <MdLocationOn />
                Havtornvej 25, 2640 Hedehusene 🇩🇰
              </li>
            </Link>
            <li>
              <MdPhone /> +45 5265 6579
            </li>
            <li>
              <MdEmail />{" "}
              <a href="mailto:nicoq1290@gmail.com" className="mail-footer">
                nicoq1290@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div className="social-col">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/nicolas-quiroga90/"
                  target="_blank"
                     className="linkedin-footer"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="separator" />

      <div className="footer-section">
        <div className="copyright">
          <p>&copy; 2024 All Rights Reserved</p>
        </div>
        <div className="terms">
          <p>Terms & Conditions | Privacy | Security | Cookie Declaration</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
