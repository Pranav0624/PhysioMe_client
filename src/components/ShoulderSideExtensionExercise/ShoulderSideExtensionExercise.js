import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'; 
import './ShoulderSideExtensionExercise.css';

import exerciseGif from './side-extension.gif'; // Import the GIF file

const ShoulderSideExtensionExercise = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetReps: '',
    threshold: ''
  });

  const navigate = useNavigate(); // Initialize navigate

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
    // Here, you can handle form data and start exercise session logic

    // Example: Redirect to the session route after form submission
    navigate('/exercise/shoulder-side-extension/session', { state: formData }); // Navigate to the session route
  };
  const handleLiveTracking = (e) => {
    e.preventDefault();
    console.log('Starting Live Tracking with data:', formData);
    navigate('/exercise/livetracking', { state: formData });
  };

  return (
    <div className="shoulder-side-flex-page-wrapper">
      <div className="sh-side-exercise-layout">
        <div className="sh-side-gif-container">
          <img src={exerciseGif} alt="Shoulder Exercise" className="sh-side-exercise-gif" />
        </div>
        <div className="sh-side-exercise-container">
          <h2>Shoulder Side-Extension Exercise Session </h2>
          <form onSubmit={handleSubmit} className="sh-side-shoulder-exercise-form">
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
              Threshold Angle - Extension:
              <input
                type="number"
                name="threshold"
                value={formData.threshold}
                onChange={handleChange}
                required
              />
            </label>
            <div className="sh-side-button-group">
            <button type="submit" className="sh-side-start-exercise-btn">Start Exercise</button>
             <button type="button" className="sh-sdie-live-tracking-btn" onClick={handleLiveTracking}>
                Live Tracking
              </button>
              </div>          </form>
        </div>
      </div>
    </div>
  );
};

export default ShoulderSideExtensionExercise