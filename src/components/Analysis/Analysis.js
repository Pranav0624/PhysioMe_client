// src/components/Analysis.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Analysis.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import vnitLogo from './vnit_logo.jpeg';

const Analysis = () => {
  const location = useLocation();
  const { analysisData } = location.state || {};

  const { validReps, invalidReps, efficiencies, name, email, threshold, targetReps  } = analysisData;
  console.log("Name: ",name);

    const generatePDF = () => {
    const input = document.getElementById('pdf-content'); // The div containing the content you want to export

    html2canvas(input)
          .then((canvas) => {
        const imgData = canvas.toDataURL('image/png'); // Generate canvas as image
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        // Add logo to the PDF
        pdf.addImage(vnitLogo, 'JPEG', 10, 10, 40, 40); // Logo at the top left
        pdf.setFontSize(20);
        pdf.text('Session Analysis Report', 105, 30, null, null, 'center'); // Centered title

        // Add the content from the canvas below the title
        pdf.addImage(imgData, 'PNG', 0, 50, imgWidth, imgHeight); // Adjust position to leave space for logo and title

        // Save the PDF with a name
        pdf.save(`${name || 'session'}_analysis_receipt.pdf`);
      })
      .catch((error) => console.error('Error generating PDF:', error));
  };

  return (
     <div className="analysis-container">
    <h1>Session Analysis</h1>

    {analysisData ? (
      <div id="pdf-content">
        <h2 className='section-title'>Participant Information</h2>
        <p className="info-paragraph"><strong>Name:</strong> {name}</p>
        <p className="info-paragraph"><strong>Email:</strong> {email}</p>
        <p className="info-paragraph"><strong>Target Reps:</strong> {targetReps}</p>
        <p className="info-paragraph"><strong>Threshold:</strong> {threshold}</p>

        <h2 className='section-title'>Reps Summary</h2>
        <p className="info-paragraph"><strong>Valid Reps Count:</strong> {validReps}</p>
        <p className="info-paragraph"><strong>Invalid Reps Count:</strong> {invalidReps}</p>
        <p className="info-paragraph"><strong>Invalid Rep Efficiencies:</strong> {efficiencies.join(', ')}</p>
      </div>
    ) : (
      <p>No data available for analysis.</p>
    )}
     <button onClick={generatePDF} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: '#fff' }}>
        Download Analysis as PDF
      </button>
  </div>
  );
};

export default Analysis;