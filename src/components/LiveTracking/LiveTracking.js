import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LiveTracking.css";

const LiveTracking = () => {
    const containerRef = useRef(null);
    const location = useLocation();
    const formData = location.state || {};
    const TOLERANCE=50;
    

    const [sensorData1, setSensorData1] = useState({
        pitch: 0,
        roll: 0,
        yaw: 0,
        reps: 0,
        invalidReps: 0,
        lastAngle: 0,
        efficiency: [],
        flexionAngle: []
    });

    

    const [sensorData2, setSensorData2] = useState({ pitch: 0, roll: 0, yaw: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Threshold value before sending:", formData.threshold);

        if (!formData.threshold || isNaN(formData.threshold)) {
            console.error("Invalid threshold value:", formData.threshold);
            return;
        }

        fetch("http://localhost:3001/update-threshold", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ threshold: Number(formData.threshold) })
        })
        .then(response => response.json())
        .then(data => console.log("Threshold updated:", data))
        .catch(error => console.error("Error updating threshold:", error));
    }, [formData.threshold]);

    useEffect(() => {
        const startPixelStreaming = async () => {
            try {
                const response = await fetch("http://localhost:3001/start-pixel-streaming", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error(`Server error: ${response.status}`);

                const data = await response.json();
                console.log(data.message);
            } catch (error) {
                console.error("Error starting Pixel Streaming:", error);
            }
        };

        startPixelStreaming();

        const script = document.createElement("script");
        script.src = "/player.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3001");

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "setUpperArmThreshold",
                threshold: formData.threshold || 60
            }));
        };

        ws.onmessage = (event) => {
            try {
                const receivedData = JSON.parse(event.data);
                if (!receivedData.sensorData1 || !receivedData.sensorData2) {
                    console.warn("Received incomplete sensor data:", receivedData);
                    return;
                }

                const { sensorData1: newSensorData1, sensorData2 } = receivedData;

                setSensorData1((prevSensorData1) => {
                    let updatedEfficiency = [...prevSensorData1.efficiency];
                    const lastAngle = newSensorData1?.lastAngle ?? prevSensorData1.lastAngle;

                    if (lastAngle !== prevSensorData1.lastAngle && lastAngle !== 0) {
                        let efficiencyValue = (lastAngle / 60) * 100;
                        updatedEfficiency.push(efficiencyValue.toFixed(2));
                    }

                    return {
                        ...prevSensorData1,
                        ...newSensorData1,
                        lastAngle,
                        efficiency: updatedEfficiency
                    };
                });

                setSensorData2(sensorData2);
            } catch (error) {
                console.error("Error parsing WebSocket data:", error);
            }
        };

        ws.onclose = () => console.log("WebSocket disconnected");

        return () => ws.close();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSensorData1(prevSensorData1 => ({
                ...prevSensorData1,
                flexionAngle: [...prevSensorData1.flexionAngle, prevSensorData1.pitch]
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log("Complete flexionAngle array:", sensorData1.flexionAngle);
    }, [sensorData1.flexionAngle]);

    useEffect(() => {
        fetch('http://localhost:3001/reset-tracking', { method: 'POST' })
          .then(response => response.json())
          .then(data => console.log(data.message))
          .catch(error => console.error('Error resetting tracking data:', error));
          console.log("Tracking data reset successfully");
    }, []);

    const navigateToShoulderAnalysis = () => {
        navigate("/exercise/livetracking/shoulderanalysis", {
            state: {
                name: formData.name,
                email: formData.email,
                targetReps: formData.targetReps,
                threshold: formData.threshold,
                sensorData1,
                sensorData2
            }
        });
    };

    return (
        <div className="live-tracking-container">
            {/* Left Side - Player */}
            <div className="live-tracking-player">
                <iframe
                    ref={containerRef}
                    src="/player.html"
                    title="Pixel Streaming Player"
                />
            </div>

            {/* Right Side - Form Data and Sensor Data */}
            <div className="live-tracking-details">
                <div className="live-tracking-section">
                    {/* Live Tracking Details */}
                    <div className="live-tracking-data">
                        <h3>Live Tracking Details</h3>
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Target Reps:</strong> {formData.targetReps}</p>
                        <p><strong>Threshold Angle:</strong> {formData.threshold}</p>
                    </div>

                    {/* Sensor Data */}
                    <div className="live-tracking-data">
                        <h3>Sensor Data</h3>
                        <p><strong>Reps:</strong> {sensorData1?.reps}</p>
                        <p><strong>Invalid Reps:</strong> {sensorData1?.invalidReps}</p>
                        <p><strong>Current Angle:</strong> {sensorData1?.pitch+90}</p>
                        <p><strong>Efficiency:</strong> {sensorData1?.efficiency?.slice(-1)[0] ?? "N/A"}%</p>
                        <p><strong>Last Angle:</strong> {sensorData1?.lastAngle}</p>

                        {sensorData2?.pitch < 90 && sensorData2?.pitch > 0 && (
                            <p style={{ color: 'red' }}>
                                ⚠ Adjust Lower Arm Pitch: Keep it between 0° and 90° for accurate readings!
                            </p>

                            
                        )}

                        {Math.abs(sensorData1.yaw-sensorData2.yaw)>TOLERANCE && Math.abs(sensorData1.roll-sensorData2.roll)>TOLERANCE  && (
                                                    <p style={{ color: 'red' }}>
                                                        ⚠ Please adjust the lower arm to be in sync with the upper arm and maintain roll/yaw within ±50 degrees of initial position.
                                                    </p>

                                                    
                                                )}
                    </div>
                </div>

                {/* Navigation Button */}
                <div className="navigation-button">
                    <button onClick={navigateToShoulderAnalysis}>
                        GO TO SHOULDER ANALYSIS
                    </button>
                </div>
            </div>
        </div>
    );
};

/*
const navigateToShoulderAnalysis = () => {
    navigate("/exercise/livetracking/shoulderanalysis", {
        state: {
            name: formData.name,
            email: formData.email,
            targetReps: formData.targetReps,
            threshold: formData.threshold,
            sensorData1,
            sensorData2
        }
    });
};

*/

export default LiveTracking;


