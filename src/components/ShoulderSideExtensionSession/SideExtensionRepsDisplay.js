import React ,{useState,useEffect,useCallback}from 'react'
import { useNavigate } from 'react-router-dom';

import { ref, set } from "firebase/database";
import { database } from './firebaseConfigSideExtension';

const SideExtensionRepsDisplay = ({threshold,targetReps,name,email}) => {
  const [sensorData, setSensorData] = useState({
    tiltAngleX: 0,
    tiltAngleY: 0,
    tiltAngleZ: 0,
  });
  const [error, setError] = useState(null);
  const [reps, setReps] = useState(0);
  const [invalidReps, setInvalidReps] = useState(0);
  const [efficiency, setEfficiency] = useState(null);


  const [invalidRepsEfficiencies, setInvalidRepsEfficiencies] = useState([]);

   const navigate = useNavigate();

  // Use React state to persist values across renders
  const [aboveThreshold, setAboveThreshold] = useState(false);
  const [retreatedToZero, setRetreatedToZero] = useState(false);
  const [lastAngle, setLastAngle] = useState(0);

  





  const processRepLogic = useCallback((xTilt) => {
    console.log('Processing Started: ', xTilt, 'Last Angle: ',lastAngle);

    if (xTilt > threshold && xTilt < 180 && !aboveThreshold) {
      setAboveThreshold(true);
      setLastAngle(0);
    } 
    else if (xTilt < 10 && aboveThreshold && xTilt>=0) {
      setAboveThreshold(false);
      setRetreatedToZero(true);
    }

    if (xTilt > 10 && xTilt < threshold && !aboveThreshold) {
      if (xTilt > lastAngle) setLastAngle(xTilt);
    }

  

    if (retreatedToZero) {
      setReps((prevReps) => prevReps + 1);  // Increment valid reps
      setRetreatedToZero(false);  // Reset retreatedToZero
      setLastAngle(0);
    }

     else  if (lastAngle > 0 && xTilt < 10 && xTilt>=0) {
      const efficiency = (lastAngle / threshold) * 100;
      setEfficiency(efficiency.toFixed(2));
      setInvalidRepsEfficiencies((prev) => [...prev, efficiency.toFixed(2)]);
      setInvalidReps((prevInvalidReps) => prevInvalidReps + 1);
      setLastAngle(0);  // Reset lastAngle after invalid rep is calculated
    }


  }, [threshold, aboveThreshold, lastAngle, retreatedToZero]);

  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sensor-data');
      if (!response.ok) {
        throw new Error('Failed to fetch sensor data');
      }
      const data = await response.json();
      setSensorData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (sensorData.tiltAngleX) {
      processRepLogic(sensorData.tiltAngleX);
    }
  }, [sensorData.tiltAngleX, processRepLogic]);

  useEffect(() => {
    fetchSensorData();
    //console.log(sensorData)
    const intervalId = setInterval(fetchSensorData, 500);

    return () => clearInterval(intervalId);
  }, []);

   const handleEndSession = () => {
    const analysisData = {
      validReps: reps,
      invalidReps: invalidReps,
      efficiencies: invalidRepsEfficiencies,
      name,
      email,
      threshold,
      targetReps, // Send all efficiencies of invalid reps
    };
    console.log({ name, email, targetReps, threshold });
     //const sessionId = new Date().toISOString();
     const sessionId = new Date().toISOString().replace(/[:.]/g, '-');


      set(ref(database, `Shoulder/${sessionId}`), analysisData)
      .then(() => {
         console.log("Data stored successfully");
         //navigate('/exercise/shoulder/session/analysis', { state: analysisData }); // Navigate to analysis page
      })
      .catch((error) => {
         console.error("Error storing data:", error);
      });
    navigate('/exercise/shoulder-side-extension/session/analysis', { state: { analysisData } });
  };
    useEffect(() => {
    if (reps >= targetReps) {
      handleEndSession();
    }
  }, [reps, targetReps]); 

   return (
    <div className='reps-display-container'>
      <h1>Sensor Data Tracker</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className='box'>
          <div className='reps-tracker'>
            <p>Tilt Angle X: {sensorData.tiltAngleX}°</p>
            <p>Tilt Angle Y: {sensorData.tiltAngleY}°</p>
            <p>Tilt Angle Z: {sensorData.tiltAngleZ}°</p>
          </div>
        </div>
      )}

      <div>
        <h1>Reps Tracker</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div className='box'>
            <div className='reps-tracker'>
            <p>Valid Reps Count: {reps}</p>
            <p>Invalid Reps Count: {invalidReps}</p>
            {efficiency && <p>Last Invalid Rep Efficiency: {efficiency}%</p>}
          </div>
          </div>
        )}
      </div>
      <button onClick={handleEndSession}>End Session</button>
    </div>
  );
};

export default SideExtensionRepsDisplay