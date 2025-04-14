// import React, { useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ShoulderExercise.css';
// import exerciseGif from './shoulder_flex_ext.gif'; // Import the GIF file
// import { useAuth } from '../AuthContext/AuthContext.js';
// const ShoulderExercise = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     targetReps: '',
//     threshold: ''
//   });
//   const { userAuth } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userAuth) {
//       // console.log(Authentication Data:${userAuth})
//       console.log(userAuth.displayName)
//       setFormData((prevData) => ({
//         ...prevData,
//         name: userAuth.displayName || '', // Use user's name from the context
//         email: userAuth.email || '' // Use user's email from the context
//       }));
//     }
//   }, [userAuth]); // Re-run effect if userAuth changes

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Starting exercise with data:', formData);
//     navigate('/exercise/shoulder/session', { state: formData });
//   };

//   return (
//     <div className="shoulder-flex-page-wrapper">
//       <div className="sh-exercise-layout">
//         <div className="sh-gif-container">
//           <img src={exerciseGif} alt="Shoulder Exercise" className="sh-exercise-gif" />
//         </div>
//         <div className="sh-shoulder-exercise-container">
//           <h2>Shoulder Exercise Session</h2>
//           <form onSubmit={handleSubmit} className="sh-shoulder-exercise-form">
//             <label>
//               Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 readOnly={!!userAuth?.displayName}
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 readOnly={!!userAuth?.email}
//               />
//             </label>
//             <label>
//               Number of Reps:
//               <input
//                 type="number"
//                 name="targetReps"
//                 value={formData.targetReps}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//             <label>
//               Threshold Angle:
//               <input
//                 type="number"
//                 name="threshold"
//                 value={formData.threshold}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//             <button type="submit" className="sh-start-exercise-btn">Start Exercise</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoulderExercise;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoulderExercise.css';
import exerciseGif from './shoulder_flex_ext.gif'; // Import the GIF file

const ShoulderExercise = () => {
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
    navigate('/exercise/shoulderflexion/session', { state: formData });
  };

    const handleLiveTracking = (e) => {
    e.preventDefault();
    console.log('Starting Live Tracking with data:', formData);
    navigate('/exercise/livetracking', { state: formData });
  };


  return (
    <div className="shoulder-flex-page-wrapper">
      <div className="sh-exercise-layout">
        <div className="sh-gif-container">
          <img src={exerciseGif} alt="Shoulder Exercise" className="sh-exercise-gif" />
        </div>
        <div className="sh-shoulder-exercise-container">
          <h2>Shoulder Exercise Session</h2>
          <form onSubmit={handleSubmit} className="sh-shoulder-exercise-form">
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
            {/* <button type="submit" className="sh-start-exercise-btn">Start Exercise</button> */}
             <button type="button" className="sh-live-tracking-btn" onClick={handleLiveTracking}>
                Start
              </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShoulderExercise;