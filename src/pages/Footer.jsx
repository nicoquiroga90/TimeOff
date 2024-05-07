import '../styles/footer.css'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="logo-col">
          <img src="/logo.png" alt="Logo" className='logo' />
        </div>
        <div className="services-col">
          <h3>Services</h3>
          <ul>
            <li>Login</li>
            <li>About TimeOFF</li>
            <li>Prices</li>
          </ul>
        </div>
        <div className="contact-col" id="contact">
          <h3>Contact Us</h3>
          <ul>
            <li><MdLocationOn />Havtornvej 25, 2640 Hedehusene 🇩🇰 </li>
            <li><MdPhone /> +45 5265 6579</li>
            <li><MdEmail /> nicoq1290@gmail.com</li>
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
