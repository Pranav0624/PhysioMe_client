import React from 'react';
import './About.css'; // Import custom styles

const About = () => {
  return (
    <section id="about">
      {/* Separate container for the heading */}
      <div className="about-heading-container">
        <h2 className="about-heading"> ABOUT US </h2>
      </div>

      {/* Content box without inner padding or extra margins */}
      <div className="about-container">
        <p>
          At PhysioMe, we integrate advanced sensor technology into physiotherapy, enabling real-time motion tracking and data-driven analysis. Our wearable sensors help monitor posture, movement, and exercise precision, ensuring personalized rehabilitation for faster recovery. By bridging the gap between patients and physiotherapists, we make therapy more efficient and accessible.
        </p>
        <p>
          With remote physiotherapy monitoring, specialists can track progress in real time, reducing the need for frequent in-person visits while ensuring continuous feedback and better outcomes.
        </p>
      </div>
    </section>
  );
};

export default About;
