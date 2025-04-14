import React from 'react'
import { useLocation } from 'react-router-dom';
import './ShoulderSideExtensionSession.css';

import SideExtensionRepsDisplay from './SideExtensionRepsDisplay.js';

const ShoulderSideExtensionSession = () => {
 const location = useLocation();
  const { name, email, targetReps, threshold } = location.state || {};

  return (
    <div className="shoulder-session-container">
      <h2>Shoulder Exercise Session</h2>
      {name ? (
        <div className='box'>
          <h3>Shoulder Side Extension Session</h3>
          <div className='participant-info'>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Number of Reps:</strong> {targetReps}</p>
          <p><strong>Threshold Angle:</strong> {threshold}</p>
        </div>
        </div>
      ) : (
        <p>No data available. Please go back and fill out the form.</p>
      )}
      <SideExtensionRepsDisplay threshold={threshold} targetReps={targetReps} name={name} 
          email={email}></SideExtensionRepsDisplay>
    </div>
  );
};

export default ShoulderSideExtensionSession