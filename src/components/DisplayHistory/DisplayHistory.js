import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext.js';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import './DisplayHistory.css';

const DisplayHistory = () => {
  const { userAuth } = useAuth(); // Access userAuth from context
  const [sessionData, setSessionData] = useState([]);
  
  useEffect(() => {
    if (userAuth) {
      const db = getDatabase();
      const sessionRef = ref(db, 'Shoulder');
      
      // Query for sessions where the email matches the authenticated user's email
      const sessionQuery = query(sessionRef, orderByChild('email'), equalTo(userAuth.email));
      
      // Fetch session data from Firebase
      get(sessionQuery)
        .then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            //const sessions = Object.keys(data).map(key => data[key]); // Extract session data as an array
              const sessions = Object.keys(data).map(key => ({
        id: key,  // 🔹 Store the session ID as timestamp
        ...data[key]
      }));
            setSessionData(sessions);
            console.log(sessions);
          } else {
            console.log('No session data found for this user.');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userAuth]); // Re-run when userAuth changes
  
  // if (!userAuth) {
  //   // Show loading message or spinner if userAuth is not yet loaded
  
  //   return <div className='no-history'> - - - - - - - - - - -   Login to see History - - - - - - - - - - -</div>;

  // }

      const extractDate = (timestamp) => {
  try {
    const [datePart] = timestamp.split("T");
    const [year, month, day] = datePart.split("-");
    return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
  } catch (error) {
    console.error("Error extracting date:", timestamp);
    return "Invalid Date";
  }
};
  return (
    <div className="display-history">
      <h2>Your Exercise History</h2>
      <div className="history-boxes">
        {sessionData.length > 0 ? (
          sessionData.map((session, index) => (
           <div key={index} className="history-box">
            {/* <p><strong>Name:</strong> {session.name}</p>
            <p><strong>Email:</strong> {session.email}</p> */}
            <p><strong>Exercise: Shoulder Flexion</strong> {session.ExerciseType}</p>
            <p><strong>Date:</strong> {extractDate(session.id)}</p>
            <p><strong>Target Reps:</strong> {session.targetReps}</p>
            <p><strong>Threshold:</strong> {session.threshold}</p>
            <p><strong>Valid Reps:</strong> {session.validReps}</p>
            <p><strong>Invalid Reps:</strong> {session.invalidReps}</p>

            {/* Only show efficiencies if invalidReps > 0 */}
{session.invalidReps > 0 && session.efficiencies && session.efficiencies.length > 0 && (
  <div>
<p><strong>Efficiencies:</strong> {session.efficiencies.slice(0, 3).join(', ')}</p>    
  </div>
)}

</div>

          ))
        ) : (
          <div className='no-history'>Login to see History</div>
        )}
      </div>
    </div>
  );
};

export default DisplayHistory;