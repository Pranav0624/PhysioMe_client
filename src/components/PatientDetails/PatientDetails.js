// import React, { useState, useEffect } from "react";
// import { ref, get } from "firebase/database";
// import { db } from "../firebaseConfig";
// import { auth } from "../NavbarFirebaseConfig.js";

// const PatientDetails = () => {
//   const [patients, setPatients] = useState([]);
//   const [sessionData, setSessionData] = useState({});
//   const user = auth.currentUser; // Logged-in doctor
//   useEffect(() => {
//     if (user) {
//       fetchRegisteredPatients();
//     }
//     //  console.log(patients)
//   }, [user]);

//   // 🔹 Fetch registered patients under the doctor
//   const fetchRegisteredPatients = async () => {
//     const doctorRef = ref(db, `Doctor/${user.uid}/patients`);
//     try {
//       const snapshot = await get(doctorRef);
//       if (snapshot.exists()) {
//         const patientsData = snapshot.val();
//         const patientsList = Object.entries(patientsData).map(([id, data]) => ({
//           id,
//           ...data,
//         }));
//         setPatients(patientsList);
//         fetchSessionData(patientsList);
//       }
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   // 🔹 Fetch session data from "Shoulder" table and match email

//  const fetchSessionData = async (patientsList) => {
//   try {
//     const shoulderRef = ref(db, `Shoulder`);
//     const snapshot = await get(shoulderRef);

//     if (snapshot.exists()) {
//       const shoulderData = snapshot.val();
//       let tempSessions = {};

//       Object.entries(shoulderData).forEach(([timestamp, session]) => {
//         const sessionInfo = session.efficiencies || {}; 

//         // Ensure efficiencies is stored as an array (or blank if missing)
//         const efficienciesArray = Array.isArray(sessionInfo) ? sessionInfo : [];

//         // Extract session data safely, providing defaults if missing
//         const name = session.name || "Unknown";
//         const email = session.email || "Unknown";
//         const targetReps = session.targetReps || "N/A";
//         const threshold = session.threshold || "N/A";
//         const validReps = session.validReps || 0;
//         const invalidReps = session.invalidReps || 0;

//         // Find matching patient based on email
//         const matchedPatient = email !== "Unknown"
//           ? patientsList.find((patient) => patient.email === email)
//           : null;

//         if (matchedPatient || email === "Unknown") {
//           const patientId = matchedPatient ? matchedPatient.id : "unknown";

//           if (!tempSessions[patientId]) {
//             tempSessions[patientId] = [];
//           }

//           tempSessions[patientId].push({
//             timestamp,
//             name,
//             email,
//             targetReps,
//             threshold,
//             validReps,
//             invalidReps,
//             efficiencies: efficienciesArray,  // Show efficiencies as blank array if missing
//           });
//         }
//       });

//       setSessionData(tempSessions);
//       console.log("Fetched Session Data:", tempSessions); // Debugging to check output
//     }
//   } catch (error) {
//     console.error("Error fetching session data:", error);
//   }
// };


// const extractDate = (timestamp) => {
//   try {
//     const [datePart] = timestamp.split("T");
//     const [year, month, day] = datePart.split("-");
//     return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
//   } catch (error) {
//     console.error("Error extracting date:", timestamp);
//     return "Invalid Date";
//   }
// };

// const extractTime = (timestamp) => {
//   try {
//     const timePart = timestamp.split("T")[1].split("Z")[0];
//     return timePart.replace(/:/g, "-"); // Format: HH-MM-SS-MS
//   } catch (error) {
//     console.error("Error extracting time:", timestamp);
//     return "Invalid Time";
//   }
// };


//   return (
//   <div>
//     <h2>Registered Patients</h2>
//     {patients.length > 0 ? (
//       <ul>
//         {patients.map((patient) => (
//           <li key={patient.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid black" }}>
//             <strong>Name:</strong> {patient.name} <br />
//             <strong>Email:</strong> {patient.email} <br />

//             <h4>Session Data:</h4>
//             {sessionData[patient.id] ? (
//               <ul>
//                 {sessionData[patient.id].map((session, index) => {
//                   // Convert timestamp to Date & Time
//                   const dateObj = new Date(session.timestamp);
//                   const formattedDate = dateObj.toLocaleDateString(); // e.g., "3/19/2025"
//                   const formattedTime = dateObj.toLocaleTimeString(); // e.g., "2:15 PM"

//                   return (
//                     <li key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid gray" }}>
//                       {/* <strong>Date:</strong> {formattedDate} <br />
//                       <strong>Time:</strong> {formattedTime} <br /> */}
//                       <strong>Date:</strong> {extractDate(session.timestamp)} <br />
//                       {/* <strong>Time:</strong> {extractTime(session.timestamp)} <br /> */}
//                       <strong>Invalid Reps:</strong> {session.invalidReps || "N/A"} <br />
//                       <strong>Target Reps:</strong> {session.targetReps || "N/A"} <br />
//                       <strong>Threshold:</strong> {session.threshold || "N/A"} <br />
//                       <strong>Efficiencies:</strong>{" "}
//                       {session.efficiencies && session.efficiencies.length > 0
//                         ? session.efficiencies.join(", ")
//                         : "No Efficiency Data"} <br />
//                     </li>
//                   );
//                 })}
//               </ul>
//             ) : (
//               <p>No session data available.</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     ) : (
//       <p>No patients registered under you.</p>
//     )}
//   </div>
// );

// };

import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebaseConfig";
import { auth } from "../NavbarFirebaseConfig.js";
import "./PatientDetails.css"; // Import CSS file

const PatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [sessionData, setSessionData] = useState({});
  const user = auth.currentUser; // Logged-in doctor

  useEffect(() => {
    if (user) {
      fetchRegisteredPatients();
    }
  }, [user]);

  // Fetch registered patients under the doctor
  const fetchRegisteredPatients = async () => {
    const doctorRef = ref(db, `Doctor/${user.uid}/patients`);
    try {
      const snapshot = await get(doctorRef);
      if (snapshot.exists()) {
        const patientsData = snapshot.val();
        const patientsList = Object.entries(patientsData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setPatients(patientsList);
        fetchSessionData(patientsList);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Fetch session data from "Shoulder" table and match email
  const fetchSessionData = async (patientsList) => {
    try {
      const shoulderRef = ref(db, `Shoulder`);
      const snapshot = await get(shoulderRef);

      if (snapshot.exists()) {
        const shoulderData = snapshot.val();
        let tempSessions = {};

        Object.entries(shoulderData).forEach(([timestamp, session]) => {
          const efficienciesArray = Array.isArray(session.efficiencies) ? session.efficiencies : [];
          const name = session.name || "Unknown";
          const email = session.email || "Unknown";
          const targetReps = session.targetReps || "N/A";
          const threshold = session.threshold || "N/A";
          const invalidReps = session.invalidReps || "N/A";

          const matchedPatient = patientsList.find((patient) => patient.email === email);

          if (matchedPatient) {
            const patientId = matchedPatient.id;
            if (!tempSessions[patientId]) {
              tempSessions[patientId] = [];
            }

            tempSessions[patientId].push({
              timestamp,
              name,
              email,
              targetReps,
              threshold,
              invalidReps,
              efficiencies: efficienciesArray,
            });
          }
        });

        setSessionData(tempSessions);
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  // const extractDate = (timestamp) => {
  //   try {
  //     return new Date(timestamp).toLocaleDateString();
  //   } catch (error) {
  //     return "Invalid Date";
  //   }
  // };

  const extractDate = (timestamp) => {
    try {
      const [datePart] = timestamp.split("T");
      const [year, month, day] = datePart.split("-");
      return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
    } catch (error) {
      console.error("Error extracting date:", timestamp);
      return "Invalid Date";
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Registered Patients Details</h2>
      {patients.length > 0 ? (
        patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <h3>{patient.name} <span className="email">- {patient.email}</span></h3>
          
            <h4 className="session-title">Session History</h4>
            {sessionData[patient.id] ? (
              <div className="session-container">
                {sessionData[patient.id].map((session, index) => (
                  <div key={index} className="session-card">
                    <p><strong>Date:</strong> {extractDate(session.timestamp)}</p>
                    <p><strong>Invalid Reps:</strong> {session.invalidReps}</p>
                    <p><strong>Target Reps:</strong> {session.targetReps}</p>
                    <p><strong>Threshold:</strong> {session.threshold}</p>
                    <p><strong>Efficiencies:</strong> {session.efficiencies.length > 0 ? session.efficiencies.join(", ") : "All Valid Repetitions"}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No session data available.</p>
            )}
          </div>
        ))
      ) : (
        <p className="no-patients">No patients registered under you.</p>
      )}
    </div>
  );
};

export default PatientDetails;