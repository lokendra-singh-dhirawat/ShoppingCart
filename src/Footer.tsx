import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
       
        <div className="footer-section">
          <h3>ShopMate</h3>
          <p>Your one-stop shop for all your needs. Quality guaranteed.</p>
        </div>

       
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

       
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@shopmate.com</p>
          <p>Phone: +91 9546565555</p>
          <p>Address: d-4 Shop Street, jaipur</p>
        </div>

        
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

     
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopMate. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
