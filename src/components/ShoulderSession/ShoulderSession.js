import React from 'react';
import { useLocation } from 'react-router-dom';
import './ShoulderSession.css';
import RepsDisplay from './RepsDisplay.js';
import exerciseGif from './shoulder_flex_ext.gif';

const ShoulderSession = () => {
  const location = useLocation();
  const { name, email, targetReps, threshold } = location.state || {};

  return (
    <div className="shoulder-session-wrapper">
      
        {/* Info Box - Top Left */}
        {name ? (
          <div className="ss-info-box">
            <div>
              <h3>Participant Information</h3>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Target Reps:</strong> {targetReps}</p>
              <p><strong>Threshold Angle:</strong> {threshold}°</p>
            </div>
          </div>
        ) : (
          <div className="ss-info-box">
            <p>No data available. Please go back and fill out the form.</p>
          </div>
        )}

        {/* GIF - Top Right */}
        <div className="ss-gif-container">
          <img src={exerciseGif} alt="Shoulder Exercise" className="ss-exercise-gif" />
        </div>

        {/* Sensor Data - Left Side */}
        <div className="ss-sensor-box">
          <h3>Sensor Readings</h3>
          <RepsDisplay 
            threshold={threshold} 
            targetReps={targetReps} 
            name={name} 
            email={email}
          />
        </div>

       {/* Reps Counter - Right Side 
        <div className="ss-reps-box">
          <h3>Repetition Tracking</h3>
          {/* Reps details can be added here if needed }
        </div>*/}

        {/* Scale - Bottom Center 
        <div className="ss-scale-box">
          <h3>Movement Scale</h3>
        </div>*/}
      
    </div>
  );
};

export default ShoulderSession;