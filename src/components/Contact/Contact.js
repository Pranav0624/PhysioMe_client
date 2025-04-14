import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-details">Have questions or need assistance? We’re here to help!</p>

        <div className="contact-details">
          <div className="contact-list">
            <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Fitness St, Workout City, Country</p>
          </div>

          <div className="contact-details">
            <p>We love to hear from you! Drop us a message anytime. 💌</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
