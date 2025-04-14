// // src/components/ExerciseDropdown/ExerciseDropdown.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ExerciseDropdown.css';

// const ExerciseDropdown = () => {
//   const [selectedExercise, setSelectedExercise] = useState('');
//   const navigate = useNavigate();

//   const handleExerciseChange = (event) => {
//     setSelectedExercise(event.target.value);
//     if (event.target.value === 'Shoulder') {
//       navigate('/exercise/shoulder');
//     }
//     else if (event.target.value === 'Knee-Flexion') {
//       navigate('/exercise/kneeflexion');
//     }
//     else if (event.target.value === 'Shoulder-SideExtension') {
//       navigate('/exercise/shoulder-side-extension');
//     } 
//     else if (event.target.value === 'Shoulder-FlexionExtension') {
//       navigate('/exercise/shoulderflexionextension');
//     } else if (event.target.value === 'Lumber-FlexionExtension') {
//       navigate('/exercise/lumberflexionextension');
//     }
//     else if (event.target.value === 'Live-Tracking') {
//       navigate('/exercise/livetracking');
//     }
//   };

//   return (
//     <div className="exercise-dropdown-container">
//       <label htmlFor="exercise-select">Choose an exercise: </label>
//       <select id="exercise-select" value={selectedExercise} onChange={handleExerciseChange}>
//         <option value="">Select an Exercise</option>
//         <option value="Shoulder">Shoulder-Flexion</option>
//         <option value="Knee-Flexion">Knee-Flexion</option>
//         <option value="Shoulder-SideExtension">Shoulder Side Extension</option>
//         <option value="Shoulder-FlexionExtension">Shoulder-FlexionExtension</option>
//         <option value="Lumber-FlexionExtension">Lumber-FlexionExtension</option>
//         <option value="Live-Tracking">Live Tracking</option>
//       </select>
//     </div>
//   );
// };

// export default ExerciseDropdown;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExerciseDropdown.css"; // Import CSS for styling

const ExerciseDropdown = () => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [text, setText] = useState("");
  const [response, setResponse] = useState(null);

  const navigate = useNavigate();

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
    setIsModalOpen(true); // Open modal when an exercise is selected
  };

  // const handleSelection = (side) => {
  //   console.log(`User selected: ${side}`);
  //   setIsModalOpen(false);

  //  fetch("http://localhost:3001/exercise/start", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //      // Replace with actual user ID if needed
  //     exercise: selectedExercise,
  //     side: side, // "LEFT" or "RIGHT"
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Exercise started:", data);
  //     sendExerciseToESP32(selectedExercise, side);
  //   // Navigation logic
  //   if (selectedExercise === "Shoulder-Flexion") {
  //     navigate("/exercise/shoulderflexion");
  //   } else if (selectedExercise === "Knee-Flexion") {
  //     navigate("/exercise/kneeflexion");
  //   } else if (selectedExercise === "Shoulder-SideExtension") {
  //     navigate("/exercise/shoulder-side-extension");
  //   } else if (selectedExercise === "Shoulder-FlexionExtension") {
  //     navigate("/exercise/shoulderflexionextension");
  //   } else if (selectedExercise === "Shoulder-Extension") {
  //     navigate("/exercise/shoulder-extension");
  //   } else if (selectedExercise === "Thigh-Flexion") {
  //     navigate("/exercise/thighflexion");
  //   }
  //   else if (selectedExercise === "Thigh-Extension") {
  //     navigate("/exercise/thighextension");
  //   }
  //   else if (selectedExercise === "Thigh-FlexionExtension") {
  //     navigate("/exercise/thighflexionextension");
  //   }
  // })
  //  .catch((error) => console.error("Error:", error));
  // };

    const handleSelection = async(side) => {
    console.log(`User selected: ${side}`);
    setIsModalOpen(false);
      console.log(typeof(side))
      //logic of sending string
      const esp32URL = "http://esp32.local/sendString"; // Using mDNS
      console.log((selectedExercise))
    


  const response = await sendStringToESP32(selectedExercise,side);
  setResponse(response);
     
    // Navigation logic
    if (selectedExercise === "Shoulder-Flexion") {
      navigate("/exercise/shoulderflexion");
    } else if (selectedExercise === "Knee-Flexion") {
      navigate("/exercise/kneeflexion");
    } else if (selectedExercise === "Shoulder-SideExtension") {
      navigate("/exercise/shoulder-side-extension");
    } else if (selectedExercise === "Shoulder-FlexionExtension") {
      navigate("/exercise/shoulderflexionextension");
    } else if (selectedExercise === "Shoulder-Extension") {
      navigate("/exercise/shoulder-extension");
    } else if (selectedExercise === "Thigh-Flexion") {
      navigate("/exercise/thighflexion");
    }
    else if (selectedExercise === "Thigh-Extension") {
      navigate("/exercise/thighextension");
    }
    else if (selectedExercise === "Thigh-FlexionExtension") {
      navigate("/exercise/thighflexionextension");
    }
     
  
  };

  const sendStringToESP32 = async (selectedExercise,side) => {
  const esp32URL = "http://esp32.local/sendString"; // Using mDNS
  let newString = side; // Default to side if no match
  
  if (selectedExercise === "Shoulder-Flexion" || selectedExercise === "Shoulder-Extension" || selectedExercise === "Shoulder-FlexionExtension") newString = `hand ${side}`;
  else if (selectedExercise === "Knee-Flexion") newString = `leg ${side}`;
  try {
    const res = await fetch(esp32URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: newString,
    });

    //const result = await res.text();
    //return result;
  } catch (error) {
    console.error("Error sending string:", error);
    return "Failed to connect to ESP32";
  }
};

  
  return (
    <div className="exercise-parent-container"> {/* Parent container added */}
      <div className="image-container">
        
    </div>
       {/* Right Side Containers */}
    <div className="exercise-right-container">
        {/* Exercise Message Above Dropdown */}
      <div className="exercise-message-container">
        <h3>Connecting specialists to patients</h3>
        <h1>PRECISION CARE <br /> THROUGH SMART SENSORS</h1>
      </div> 

      <div className="exercise-dropdown-container">
        <label htmlFor="exercise-select">Choose an exercise</label>
        <select id="exercise-select" value={selectedExercise} onChange={handleExerciseChange}>
          <option value="">Select</option>
          <option value="Shoulder-Flexion">Shoulder-Flexion</option>
          <option value="Shoulder-Extension">Shoulder-Extension</option>
          <option value="Shoulder-FlexionExtension">Shoulder-Flexion Extension</option>
          <option value="Shoulder-SideExtension">Shoulder-Side Extension</option>
          <option value="Knee-Flexion">Knee-Flexion</option>
          <option value="Thigh-Flexion">Thigh-Flexion</option>
          <option value="Thigh-Extension">Thigh-Extension</option>
          <option value="Thigh-FlexionExtension">Thigh-Flexion Extension</option>
        </select>
      
      {/* Manual Pop-up Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-lr">
            <h2>Select Side</h2>
            <p>Please select the side for your exercise:</p>
            <div className="modal-buttons">
              <button className="btn-left" onClick={() => handleSelection("left")}>LEFT</button>
              <button className="btn-right" onClick={() => handleSelection("right")}>RIGHT</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default ExerciseDropdown;