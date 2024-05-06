import '../styles/footer.css'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="logo-col">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div className="services-col">
          <h3>Services</h3>
          <ul>
            <li>Login</li>
            <li>Prices</li>
            <li>Help Center</li>
          </ul>
        </div>
        <div className="contact-col" id="contact">
          <h3>Contact Us</h3>
          <ul>
            <li><MdLocationOn />Enghavevej 80C, Sal 3 2450 København </li>
            <li><MdPhone /> +45 98765432</li>
            <li><MdEmail /> info@hackyourfuture.dk</li>
          </ul>
        </div>
        <div className="social-col">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <ul>
              <li><FaFacebook  /> </li>
              <li><FaTwitter   /> </li>
              <li><FaLinkedin  /> </li>
              <li><FaInstagram /> </li>
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
}

export default Footer;
