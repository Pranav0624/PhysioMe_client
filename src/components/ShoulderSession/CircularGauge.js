import React, { useState, useEffect } from 'react';
import './CircularGauge.css';

const CircularGauge = ({ angle }) => {
  const [currentAngle, setCurrentAngle] = useState(angle);

  // Function to calculate the angle difference and ensure it's the shortest
  const calculateShortestAngle = (start, end) => {
    let diff = (end - start) % 360;
    if (diff < -180) {
      diff += 360; // Ensure anticlockwise movement if necessary
    } else if (diff > 180) {
      diff -= 360; // Ensure clockwise movement if necessary
    }
    return diff;
  };

  useEffect(() => {
    const startAngle = currentAngle;
    const endAngle = angle;
    let startTime = null;

    const animateRotation = (time) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / 100; // Smooth transition over 500ms

      // Calculate the shortest angle difference
      const angleDifference = calculateShortestAngle(startAngle, endAngle);

      // Calculate the current angle by interpolating
      const newAngle = startAngle + angleDifference * progress;

      // Ensure that the angle transitions smoothly and stops at the target angle
      if (progress < 1) {
        setCurrentAngle(newAngle);
        requestAnimationFrame(animateRotation);
      } else {
        setCurrentAngle(endAngle); // Ensure the final angle is set
      }
    };

    requestAnimationFrame(animateRotation);
  }, [angle]); // Trigger animation whenever angle changes

  return (
    <div className="gauge-container">
      <svg viewBox="0 0 105 105" className="gauge">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />

        {/* Needle */}
        <line
          x1="50"
          y1="50"
          x2="5"
          y2="50"
          stroke="red"
          strokeWidth="2"
          transform={`rotate(${currentAngle}, 50, 50)`} // Rotate around the center
        />

        {/* Angle Markers */}
        <text x="-2" y="52" fontSize="6" fill="black">0°</text>
        <text x="95" y="52" fontSize="6" fill="black">180°</text>
        <text x="48" y="4" fontSize="6" fill="black">90°</text>
        <text x="45" y="102" fontSize="6" fill="black">270°</text>
      </svg>
      <div className="angle-label">Angle: {(currentAngle%360).toFixed(2)}°</div>
    </div>
  );
};

export default CircularGauge;

