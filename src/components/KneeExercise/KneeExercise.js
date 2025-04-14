
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './KneeExercise.css'; // For styling the form
import exerciseGif from './knee-extension.gif'; // Import the GIF file

const KneeExercise = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetReps: '',
    threshold: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Starting exercise with data:', formData);
    navigate('/exercise/kneeflexion/session', { state: formData });
  };
  
  const handleLiveTracking = (e) => {
    e.preventDefault();
    console.log('Starting Live Tracking with data:', formData);
    navigate('/exercise/livetracking', { state: formData });
  };

  return (
    <div className="knee-flex-page-wrapper">
      <div className="kn-exercise-layout">
        <div className="kn-gif-container">
          <img src={exerciseGif} alt="Knee Exercise" className="kn-exercise-gif" />
        </div>
        <div className="kn-knee-exercise-container">
          <h2>Knee Exercise Session</h2>
          <form onSubmit={handleSubmit} className="kn-knee-exercise-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Number of Reps:
              <input
                type="number"
                name="targetReps"
                value={formData.targetReps}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Threshold Angle - Flexion:
              <input
                type="number"
                name="threshold"
                value={formData.threshold}
                onChange={handleChange}
                required
              />
            </label>
            <div className="sh-button-group">
            <button type="submit" className="sh-start-exercise-btn">Start Exercise</button>
             <button type="button" className="sh-live-tracking-btn" onClick={handleLiveTracking}>
                Live Tracking
              </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KneeExercise;
