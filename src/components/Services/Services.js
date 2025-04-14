import React from 'react';
import './Services.css'; // Import custom styles

const Services = () => {
  return (
    <section id="services">
      {/* Heading section */}
      <div className="services-heading-container">
        <h2 className="services-heading"> OUR SERVICES </h2>
      </div>

      {/* Services content */}
      <div className="services-container">
      <div className="services-list-container">
          <ul className="services-list">
            <li><strong>Personalized Therapy Plans:</strong> Tailored exercise routines based on real-time motion tracking.</li>
            <li><strong>Remote Monitoring:</strong> Physiotherapists can track your progress anytime, reducing the need for frequent clinic visits.</li>
            <li><strong>One-on-One Coaching:</strong> Get expert guidance through virtual consultations or in-person sessions.</li>
            <li><strong>Interactive Online Resources:</strong> Access workout videos, rehabilitation guides, and self-care tips.</li>
            <li><strong>Progress Assessments:</strong> Regular reports generated through sensor data to help you stay on track.</li>
          </ul>
        </div>   

        <p>
          Whether you're recovering from an injury or looking to improve mobility, <strong>PhysioMe</strong> empowers you with data-driven insights and expert support every step of the way.
        </p>
      </div>
    </section>
  );
};

export default Services;
