// import applogo from './applogo.jpg';
// import { useLocation } from "react-router-dom";
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Label
// } from "recharts";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import "./ShoulderAnalysis.css";

// const ShoulderAnalysis = () => {
//     const location = useLocation();
//     const data = location.state; // Access passed data
//     console.log(data)
// //   const validReps = 10;
// //   const invalidReps = 2;
// // const validReps = data.reps;
// //   const invalidReps = data.invalidReps;

// const name = data?.name || "N/A";
//   const email = data?.email || "N/A";
//   const targetReps = data?.targetReps || "N/A";
//   const threshold = data?.threshold || "N/A";

// const validReps = data?.sensorData1?.reps ?? 0;
// const invalidReps = data?.sensorData1?.invalidReps ?? 0;
//   const totalReps = validReps + invalidReps;
//   let avgEfficiency = 86;
//   const patientName = "Kathan Patel";
//   const sessionId = "1";
//   const updatedAt = new Date().toLocaleString("en-GB");
// //   const reportRef = useRef(null);

// //   const flexionData = [
// //     { time: 0, angle: 0 },
// //     { time: 1, angle: 30 },
// //     { time: 2, angle: 60 },
// //     { time: 3, angle: 90 },
// //     { time: 4, angle: 120 },
// //     { time: 5, angle: 139 }
// //   ];
// const flexionAngle = data?.sensorData1?.flexionAngle || []; // Handle potential undefined errors

// const flexionData = flexionAngle.map((angle, index) => ({
//     time: index,
//     angle: angle
// }));
//   const efficiencyPieData = [
//     { name: "Efficiency", value: avgEfficiency },
//     { name: "Remaining", value: 100 - avgEfficiency }
//   ];
//   const efficiencyA = data?.sensorData1?.efficiencyA ?? [];
//   avgEfficiency = efficiencyA.length > 0 
//   ? Math.round(efficiencyA.reduce((sum, value) => sum + value, 0) / efficiencyA.length) 
//   : 0;
//   const efficiencyPerRep = efficiencyA.map((efficiency, index) => ({
//     rep: index + 1,
//     efficiency: Math.round(efficiency)
//   }));
//   console.log(avgEfficiency);
//   console.log("Efficiency per rep:", efficiencyPerRep);
// //   const efficiencyPerRep = [
// //     { rep: 1, efficiency: 70 },
// //     { rep: 2, efficiency: 75 },
// //     { rep: 3, efficiency: 82 },
// //     { rep: 4, efficiency: 88 },
// //     { rep: 5, efficiency: 85 },
// //     { rep: 6, efficiency: 90 },
// //     { rep: 7, efficiency: 86 },
// //     { rep: 8, efficiency: 89 },
// //     { rep: 9, efficiency: 91 },
// //     { rep: 10, efficiency: 93 }
// //   ];

//   const generatePDF = () => {
//     const input = document.getElementById('pdf-content'); // The div containing the content you want to export
//     input.classList.add("pdf-mode");
//     html2canvas(input)
//           .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png'); // Generate canvas as image
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const imgWidth = 210; // A4 width in mm
//         const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//         // Add logo to the PDF
//         pdf.addImage(applogo, 'JPEG', 10, 10, 40, 40); // Logo at the top left
//         pdf.setFontSize(20);
//         pdf.text('Session Analysis Report', 105, 30, null, null, 'center'); // Centered title

//         // Add the content from the canvas below the title
//         pdf.addImage(imgData, 'PNG', 0, 50, imgWidth, imgHeight); // Adjust position to leave space for logo and title

//         // Save the PDF with a name
//         pdf.save(`${data?.name || 'session'}_analysis_receipt.pdf`);
//       })
//       .catch((error) => console.error('Error generating PDF:', error))
//       .finally(() => {
//         // Remove the class after PDF is generated
//         input.classList.remove("pdf-mode");
//       });
      
//   };

//   return (
//     <div className="analysis-container" id='pdf-content' >
//         <div className="download-btn-container">
//       <button className="download-btn" onClick={generatePDF}>
//         ⬇ Download PDF
//       </button>
//     </div>
//       <h1 className="analysis-title">Physiotherapy Report</h1>
//       <div className="summary-section">
//         <div className="summary-card">
//           <h2>📝 Session Summary</h2>
//           <p><strong>Name:</strong> {name}</p>
//           <p><strong>Email:</strong> {email}</p>
//           <p><strong>Target Reps:</strong> {targetReps}</p>
//           <p><strong>Threshold Angle:</strong> {threshold}°</p>
//           <p><strong>Valid Reps:</strong> {validReps}</p>
//           <p><strong>Invalid Reps:</strong> {invalidReps}</p>
//           <p><strong>Avg Efficiency:</strong> {avgEfficiency}%</p>
//         </div>
//       </div>

//       {/* <div className="info-bar">
//         <div className="info-details">
//           <div className="info-item">
//             <span className="info-label">👤 Patient Name:</span>
//             <span className="info-value">{patientName}</span>
//           </div>
//           <div className="info-item">
//             <span className="info-label">🆔 Session ID:</span>
//             <span className="info-value">{sessionId}</span>
//           </div>
//           <div className="info-item">
//             <span className="info-label">🕒 Last Updated:</span>
//             <span className="info-value">{updatedAt}</span>
//           </div>
//         </div>
//       </div> */}

//       {/* <button className="download-btn"  onClick={generatePDF}>
//         ⬇ Download PDF
//       </button> */}

//       <div className="charts-grid-top">
//         {/* Repetition Breakdown */}
//         <div className="chart-card">
//           <h2 className="chart-title">Repetition Breakdown</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart
//               data={[
//                 { name: "Valid", value: validReps },
//                 { name: "Invalid", value: invalidReps },
//                 { name: "Total", value: totalReps }
//               ]}
//             >
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#22c55e" animationDuration={1500} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Efficiency per Repetition Line Chart */}
//         <div className="chart-card">
//           <h2 className="chart-title">Efficiency per Repetition</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={efficiencyPerRep}>
//               <XAxis dataKey="rep" label={{ value: "Repetition", position: "insideBottom", offset: -5 }} />
//               <YAxis domain={[60, 100]} label={{ value: "Efficiency (%)", angle: -90, position: "insideLeft" }} />
//               <CartesianGrid strokeDasharray="3 3" />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="efficiency"
//                 stroke="#3b82f6"
//                 strokeWidth={3}
//                 dot={{ r: 5 }}
//                 activeDot={{ r: 7 }}
//                 animationDuration={1500}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Efficiency Pie Chart */}
//         { <div className="chart-card">
//           <h2 className="chart-title">Efficiency Progress</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={efficiencyPieData}
//                 dataKey="value"
//                 innerRadius={60}
//                 outerRadius={80}
//                 paddingAngle={5}
//               >
//                 {efficiencyPieData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={index === 0 ? "#3b82f6" : "#e5e7eb"}
//                   />
//                 ))}
//                 <Label
//                   value={`${avgEfficiency}%`}
//                   position="center"
//                   fill="#111827"
//                   fontSize={22}
//                   fontWeight="bold"
//                 />
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div> }
//       </div>

//       {/* Flexion Line Chart in a new row */}
//       <div className="line-chart-row">
//         <div className="chart-card">
//           <h2 className="chart-title">Flexion Angle Over Time</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={flexionData}>
//               <XAxis dataKey="time" label={{ value: "Time", position: "insideBottom", offset: -5 }} />
//               <YAxis label={{ value: "Angle (°)", angle: -90, position: "insideLeft" }} />
//               <CartesianGrid strokeDasharray="3 3" />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="angle"
//                 stroke="#14b8a6"
//                 strokeWidth={3}
//                 dot={{ r: 5 }}
//                 animationDuration={1500}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       {/* <div className="download-btn-container">
//       <button className="download-btn"  onClick={generatePDF}>
//         ⬇ Download PDF
//       </button>
//       </div> */}
//       <div></div>
//     </div>
//   );
// };

// export default ShoulderAnalysis;




// new code





import applogo from './applogo.jpg';
import { useLocation } from "react-router-dom";
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./ShoulderAnalysis.css";

const ShoulderAnalysis = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const name = data?.name || "N/A";
  const email = data?.email || "N/A";
  const targetReps = data?.targetReps || "N/A";
  const threshold = data?.threshold || "N/A";
  const validReps = data?.sensorData1?.reps ?? 0;
  const invalidReps = data?.sensorData1?.invalidReps ?? 0;
  const totalReps = validReps + invalidReps;
  const flexionAngle = data?.sensorData1?.flexionAngle || [];

  const flexionData = flexionAngle.map((angle, index) => ({
    time: index,
    angle: angle
  }));

  const efficiencyA = data?.sensorData1?.efficiencyA ?? [];
  const avgEfficiency = efficiencyA.length > 0
    ? Math.round(efficiencyA.reduce((sum, value) => sum + value, 0) / efficiencyA.length)
    : 0;

  const efficiencyPerRep = efficiencyA.map((efficiency, index) => ({
    rep: index + 1,
    efficiency: Math.round(efficiency)
  }));

  const efficiencyPieData = [
    { name: "Efficiency", value: avgEfficiency },
    { name: "Remaining", value: 100 - avgEfficiency }
  ];

  const generatePDF = () => {
    const input = document.getElementById('pdf-content');
    input.classList.add("pdf-mode");
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(applogo, 'JPEG', 10, 10, 40, 40);
        pdf.setFontSize(20);
        pdf.text('Session Analysis Report', 105, 30, null, null, 'center');
        pdf.addImage(imgData, 'PNG', 0, 50, imgWidth, imgHeight);
        pdf.save(`${data?.name || 'session'}_analysis_receipt.pdf`);
      })
      .catch((error) => console.error('Error generating PDF:', error))
      .finally(() => {
        input.classList.remove("pdf-mode");
      });
  };

  return (
    <div className="analysis-container" id='pdf-content'>
         <div className="content-wrapper">
      <div className="download-btn-container">
        <button className="download-btn" onClick={generatePDF}>
          ⬇ Download PDF
        </button>
      </div>

      <h1 className="analysis-title">Physiotherapy Report</h1>

      <div className="summary-section">
        <div className="summary-card">
          <h2>📝 Session Summary</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Target Reps:</strong> {targetReps}</p>
          <p><strong>Threshold Angle:</strong> {threshold}°</p>
          <p><strong>Valid Reps:</strong> {validReps}</p>
          <p><strong>Invalid Reps:</strong> {invalidReps}</p>
          <p><strong>Avg Efficiency:</strong> {avgEfficiency}%</p>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h2 className="chart-title">Repetition Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: "Valid", value: validReps },
                { name: "Invalid", value: invalidReps },
                { name: "Total", value: totalReps }
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Efficiency per Repetition</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={efficiencyPerRep}>
              <XAxis dataKey="rep" label={{ value: "Repetition", position: "insideBottom", offset: -5 }} />
              <YAxis domain={[60, 100]} label={{ value: "Efficiency (%)", angle: -90, position: "insideLeft" }} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Efficiency Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={efficiencyPieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              >
                {efficiencyPieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#3b82f6" : "#e5e7eb"}
                  />
                ))}
                <Label
                  value={`${avgEfficiency}%`}
                  position="center"
                  fill="#111827"
                  fontSize={22}
                  fontWeight="bold"
                />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="line-chart-row">
        <div className="chart-card">
          <h2 className="chart-title">Flexion Angle Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={flexionData}>
              <XAxis dataKey="time" label={{ value: "Time", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Angle (°)", angle: -90, position: "insideLeft" }} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="angle"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ r: 5 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ShoulderAnalysis;