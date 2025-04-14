// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css'; // Importing the CSS for Footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <section id='footer-contact'>
      <div className="footer-content">
        {/* Left side - Contact info */}
        <div className="footer-left">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:physiome_help@gmail.com">physiome_help@gmail.com</a></p>
          <p>Phone: (+91) 9004381506</p>
          <p>Address: VNIT college , Nagpur, India</p>
        </div>
        
        {/* Right side - FAQ link */}
        <div className="footer-right">
          <h4>FAQ</h4>
          <p><a href="#faq">Visit our FAQ page for more info</a></p>
         
        
        </div>
      </div>
      </section>
    </footer>
  );
};

export default Footer;
