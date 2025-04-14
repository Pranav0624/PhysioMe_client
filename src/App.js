// import React from 'react';
import React,{ useState, useEffect } from 'react';
import './App.css';  // Global styles
import Navbar from './components/Navbar';

import About from './components/About/About.js';
import Services from './components/Services/Services.js';
import FAQ from './components/FAQ/FAQ.js';
import Registration from './components/Registration/Registration.js';

import DisplayHistory from './components/DisplayHistory/DisplayHistory.js';
import PatientDetails from './components/PatientDetails/PatientDetails.js';

import shoulderImage from './components/Images/shoulder.jpeg';
import kneeImage from './components/Images/knee.jpeg';
import lumberImage from './components/Images/lumber.jpeg';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import ExerciseDropdown from './components/ExerciseDropdown/ExerciseDropdown';

import ShoulderExercise from './components/ShoulderExercise/ShoulderExercise';
import ShoulderSession from './components/ShoulderSession/ShoulderSession.js';
import ShoulderAnalysis from './components/ShoulderAnalysis/ShoulderAnalysis.js';


import ShoulderSideExtensionExercise from './components/ShoulderSideExtensionExercise/ShoulderSideExtensionExercise.js';
import ShoulderSideExtensionSession from './components/ShoulderSideExtensionSession/ShoulderSideExtensionSession.js';
import ShoulderSideExtensionAnalysis from './components/ShoulderSideExtensionAnalysis/ShoulderSideExtensionAnalysis.js';

import KneeExercise from './components/KneeExercise/KneeExercise';
import KneeFlexionExercise from './components/KneeFlexionExercise/KneeFlexionExercise.js';

import ThighFlexion from './components/ThighFlexion/ThighFlexion.js';
import ThighExtension from './components/ThighExtension/ThighExtension.js';
import ThighFlexionExtension from './components/ThighFlexionExtension/ThighFlexionExtension.js';

import Footer from './components/Footer/Footer.js'; // Import Footer component

import { AuthProvider } from './components/AuthContext/AuthContext.js';
import LiveTracking from './components/LiveTracking/LiveTracking.js';

import { ref, get } from "firebase/database";
import { auth } from "./components/NavbarFirebaseConfig.js";
import { db } from "./components/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserRole(currentUser.uid);
      } else {
        setUser(null);
        setRole(null);
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  const fetchUserRole = async (userId) => {
    try {
      const patientRef = ref(db, `Patient/${userId}`);
      const doctorRef = ref(db, `Doctor/${userId}`);

      const patientSnapshot = await get(patientRef);
      const doctorSnapshot = await get(doctorRef);

      if (patientSnapshot.exists()) {
        setRole("Patient");
      } else if (doctorSnapshot.exists()) {
        setRole("Doctor");
      } else {
        setRole(null);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  return (
    <AuthProvider>
    <div className="App">
      <Navbar />

      {/* Render ExerciseDropdown and other components for homepage */}
      {location.pathname === '/' && <ExerciseDropdown />}
      <div className="exercises-header">
</div>
      {/* Add Card Container below ExerciseDropdown */}
      {location.pathname === '/' && (
  <div>
    {/* Common heading for the cards */}
    <div className="exercises-header">
      <h1>EXERCISES AVAILABLE</h1>
    </div>

    <div className="card-container">
      <div className="card">
        <img src={shoulderImage} alt="Shoulder Exercise " />
        <h3> = Shoulder = </h3>
        <p>Here to help shoulders feel strong and happy again! 💪💕</p>
      </div>
      <div className="card">
        <img src={kneeImage} alt="Knee Exercise" />
        <h3>= Knee = </h3>
        <p>Knees giving you trouble? We’ve got the perfect care for them! 🦵✨</p>
      </div>
      <div className="card">
        <img src={lumberImage} alt="Lumbar Exercise" />
        <h3>= Lumbar = </h3>
        <p>Say goodbye to lumbar pain with our soothing treatments and rehab! 🌿😊</p>
      </div>
    </div>
  </div>
)}
      {location.pathname === "/" && (
        <>
          {role === "Patient" && <Registration />}
          {role === "Doctor" && <PatientDetails />}
        </>
      )}

      {/* Other components to be rendered only on homepage */}
      {location.pathname === '/' && <DisplayHistory />}
      {location.pathname === '/' && <About />}
      {location.pathname === '/' && <Services />}
      {/* {location.pathname === '/' && <Contact />} */}
      {location.pathname === '/' && <FAQ />}
      {/* {location.pathname === '/' && <Footer-contact/>} */}

      <Routes>
        {/* Define Routes for other pages */}
        <Route path="/exercise/shoulderflexion" element={<ShoulderExercise />} />
        <Route path="/exercise/shoulderflexion/session" element={<ShoulderSession />} />
        {/* <Route path="/exercise/shoulderflexion/session/analysis" element={<Analysis />} /> */}
        <Route path="/exercise/livetracking/shoulderanalysis" element={<ShoulderAnalysis />} />

        <Route path="/exercise/shoulder-side-extension" element={<ShoulderSideExtensionExercise />} />
        <Route path="/exercise/shoulder-side-extension/session" element={<ShoulderSideExtensionSession />} />
        <Route path="/exercise/shoulder-side-extension/session/analysis" element={<ShoulderSideExtensionAnalysis />} />

        <Route path="/exercise/shoulder-side-extension" element={<ShoulderSideExtensionExercise />} />
        <Route path="/exercise/shoulder-side-extension/session" element={<ShoulderSideExtensionSession />} />
        <Route path="/exercise/shoulder-side-extension/session/analysis" element={<ShoulderSideExtensionAnalysis />} />

        <Route path="/exercise/thighflexion" element={<ThighFlexion />} />
        <Route path="/exercise/thighextension" element={<ThighExtension />} />
        <Route path="/exercise/thighflexionextension" element={<ThighFlexionExtension />} />

        
        <Route path="/exercise/kneeflexion" element={<KneeExercise />} />

        <Route path="/exercise/shoulder-side-extension" element={<ShoulderSideExtensionExercise />} />
        <Route path="/exercise/shoulder-side-extension/session" element={<ShoulderSideExtensionSession />} />
        <Route path="/exercise/shoulder-side-extension/session/analysis" element={<ShoulderSideExtensionAnalysis />} />

        <Route path="/exercise/livetracking" element={<LiveTracking streamUrl="ws://127.0.0.1:8888"/>} />
      </Routes>

      {/* Footer will be displayed across all pages */}
      <Footer/>
    </div>
    </AuthProvider>
  );
}

export default App;


// import React, { useState } from "react";

// const App = () => {
//   const [text, setText] = useState("");
//   const [response, setResponse] = useState(null);

//   const sendStringToESP32 = async () => {
//     const esp32URL = "http://esp32.local/sendString"; // Using mDNS

//     try {
//       const res = await fetch(esp32URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "text/plain",
//         },
//         body: text,
//       });

//       const result = await res.text();
//       setResponse(result);
//     } catch (error) {
//       console.error("Error sending string:", error);
//       setResponse("Failed to connect to ESP32");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Send String to ESP32</h1>
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter text"
//       />
//       <button onClick={sendStringToESP32} style={{ marginLeft: "10px" }}>
//         Send
//       </button>
//       {response && <p>ESP32 Response: {response}</p>}
//     </div>
//   );
// };

// export default App;
