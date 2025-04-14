import React, { useState, useEffect } from "react";
import { ref, get, update, set } from "firebase/database";
import { db } from "../firebaseConfig";
import { auth } from '../NavbarFirebaseConfig.js';
import { onAuthStateChanged } from "firebase/auth";
import "./Registration.css"; // Import updated CSS

const Registration = () => {
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Listen for authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe(); // Cleanup
  }, []);

  // ✅ Fetch doctors when user is available
  useEffect(() => {
    if (user) {
      fetchDoctors();
      fetchRegisteredDoctors();
    }
  }, [user]);

  // 🔹 Fetch all available doctors
  const fetchDoctors = async () => {
    try {
      const doctorsRef = ref(db, "Doctor");
      const snapshot = await get(doctorsRef);
      if (snapshot.exists()) {
        const doctorsData = snapshot.val();
        setAvailableDoctors(Object.entries(doctorsData).map(([id, data]) => ({ id, ...data })));
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // 🔹 Fetch registered doctors for the logged-in patient
  const fetchRegisteredDoctors = async () => {
    if (!user) return;

    try {
      const patientRef = ref(db, `Patient/${user.uid}/doctorId`);
      const snapshot = await get(patientRef);
      if (snapshot.exists()) {
        const doctorIds = snapshot.val();
        if (!doctorIds) return;

        const doctorDetails = [];
        for (const doctorId of Object.values(doctorIds)) {
          const doctorRef = ref(db, `Doctor/${doctorId}`);
          const doctorSnapshot = await get(doctorRef);
          if (doctorSnapshot.exists()) {
            doctorDetails.push({ id: doctorId, ...doctorSnapshot.val() });
          }
        }
        setRegisteredDoctors(doctorDetails);
      }
    } catch (error) {
      console.error("Error fetching registered doctors:", error);
    }
  };

  // 🔹 Register the patient under a selected doctor
  const registerUnderDoctor = async (doctorId) => {
    if (!user) return;

    try {
      const patientRef = ref(db, `Patient/${user.uid}`);
      const doctorRef = ref(db, `Doctor/${doctorId}/patients/${user.uid}`);

      // ✅ Store doctor ID under patient's record
      await update(patientRef, { [`doctorId/${doctorId}`]: doctorId });

      // ✅ Add patient to the doctor’s "patients" list
      await set(doctorRef, {
        uid: user.uid,
        name: user.displayName || "Unknown",
        email: user.email || "No email",
      });

      console.log("Successfully registered under doctor!");
      fetchRegisteredDoctors(); // Refresh registered doctors list
    } catch (error) {
      console.error("Error registering under doctor:", error);
    }
  };

  return (
    <div className="doctor-registration-container">
      <h2 className="doctor-registration-title">Doctor Registration</h2>

      {/* 🔹 Registered Doctors Section */}
      <div className="doctor-lists">
        <div className="registered-doctors">
          <h3 className="section-title">Registered Doctors</h3>
          {registeredDoctors.length > 0 ? (
            <ul className="doctor-list">
              {registeredDoctors.map((doc) => (
                <li key={doc.id} className="doctor-item">
                  {doc.name} <span className="doctor-email">({doc.email})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-doctor-message">You are not registered with any doctor.</p>
          )}
        </div>

        {/* 🔹 Available Doctors Section */}
        <div className="available-doctors">
          <h3 className="section-title">Available Doctors</h3>
          {availableDoctors.length > 0 ? (
            <ul className="doctor-list">
              {availableDoctors.map((doc) => (
                <li key={doc.id} className="doctor-item">
                  {doc.name} <span className="doctor-email">({doc.email})</span>
                  {registeredDoctors.some((registeredDoc) => registeredDoc.id === doc.id) ? (
                    <button className="register-button" disabled>
                      Registered
                    </button>
                  ) : (
                    <button className="register-button" onClick={() => registerUnderDoctor(doc.id)}>
                      Register
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-doctor-message">No doctors available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
