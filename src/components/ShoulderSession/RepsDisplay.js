import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ref, set } from "firebase/database";
import { database } from './firebaseConfig';
import CircularGauge from './CircularGauge';

const RepsDisplay = ({ threshold, targetReps, name, email }) => {
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

  const [aboveThreshold, setAboveThreshold] = useState(false);
  const [retreatedToZero, setRetreatedToZero] = useState(false);
  const [lastAngle, setLastAngle] = useState(0);

  const processRepLogic = useCallback((yTilt) => {
    if (yTilt > threshold && yTilt < 180 && !aboveThreshold) {
      setAboveThreshold(true);
      setLastAngle(0);
    } 
    else if (yTilt < 10 && aboveThreshold && yTilt >= 0) {
      setAboveThreshold(false);
      setRetreatedToZero(true);
    }

    if (yTilt > 10 && yTilt < threshold && !aboveThreshold) {
      if (yTilt > lastAngle) setLastAngle(yTilt);
    }

    if (retreatedToZero) {
      setReps((prevReps) => prevReps + 1);
      setRetreatedToZero(false);
      setLastAngle(0);
    }
    else if (lastAngle > 0 && yTilt < 10 && yTilt >= 0) {
      const efficiency = (lastAngle / threshold) * 100;
      setEfficiency(efficiency.toFixed(2));
      setInvalidRepsEfficiencies((prev) => [...prev, efficiency.toFixed(2)]);
      setInvalidReps((prevInvalidReps) => prevInvalidReps + 1);
      setLastAngle(0);
    }
  }, [threshold, aboveThreshold, lastAngle, retreatedToZero]);

  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sensor-data');
      if (!response.ok) {
        throw new Error('Failed to fetch sensor data');
      }
      const data = await response.json();
      data.tiltAngleY += 90;
      setSensorData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (sensorData.tiltAngleY) {
      console.log(sensorData.tiltAngleY%360)
      processRepLogic(sensorData.tiltAngleY%360);
    }
  }, [sensorData.tiltAngleY, processRepLogic]);

  useEffect(() => {
    fetchSensorData();
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
      targetReps,
    };
    
    const sessionId = new Date().toISOString().replace(/[:.]/g, '-');

    set(ref(database, `Shoulder/${sessionId}`), analysisData)
      .then(() => {
        console.log("Data stored successfully");
      })
      .catch((error) => {
        console.error("Error storing data:", error);
      });
    
    navigate('/exercise/shoulder/session/analysis', { state: { analysisData } });
  };

  useEffect(() => {
    if (reps >= targetReps) {
      handleEndSession();
    }
  }, [reps, targetReps]);

  return (
    <>
      {/* Sensor Readings for Sensor Box */}
      <div className="sensor-readings">
        <p>Tilt Angle X: {sensorData.tiltAngleX}°</p>
        <p>Tilt Angle Y: {sensorData.tiltAngleY % 360}°</p>
        <p>Tilt Angle Z: {sensorData.tiltAngleZ}°</p>
        {/* {error && <p>Error: {error}</p>} */}
      </div>

      {/* Circular Gauge for Scale Box */}
      <div className="gauge-container">
        <CircularGauge angle={sensorData.tiltAngleY} maxAngle={180} />
      </div>

      {/* Reps Tracking Information for Reps Box */}
      <div className="reps-tracking">
        <p>Active Repetitions: {reps}</p>
        <p>Incomplete Repetitions: {invalidReps}</p>
        <p>Progress of Last Incomplete Repetition: {efficiency}%</p>
        <p><strong>Tip:</strong> Lift your arm higher in front of you.</p>
        <button onClick={handleEndSession}>End Session</button>
      </div>
    </>
  );
};

export default RepsDisplay;