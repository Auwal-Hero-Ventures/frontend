// WasteReporting.js
import React, { useState } from 'react';
import './App.css'; // Import your existing styles

const WasteReporting = () => {
  const [reportStatus, setReportStatus] = useState({
    message: '',
    display: 'none'
  });

  const handleReportButtonClick = () => {
    const wasteType = document.getElementById('waste-type').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    if (wasteType && location && description) {
      fetch('/report-waste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wasteType, location, description }),
      })
        .then(response => response.json())
        .then(data => {
          setReportStatus({
            message: data.message,
            display: 'block'
          });
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="waste-reporting-section"> {/* Add class for WasteReporting styling */}
      <header>
        <h1>Waste Reporting</h1>
      </header>
      <main>
        <section>
          <h2>Report Waste</h2>
          <form id="report-form">
            <label htmlFor="waste-type">Waste Type:</label>
            <select id="waste-type" name="waste-type" required>
              <option value="plastic">Plastic</option>
              <option value="paper">Paper</option>
              <option value="metal">Metal</option>
            </select>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" required />
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" rows="4" required></textarea>
            <button type="button" id="report-button" onClick={handleReportButtonClick}>Report</button>
          </form>
          <div id="report-status" style={{ display: reportStatus.display }}>
            <p>Report status: <span id="report-message">{reportStatus.message}</span></p>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default WasteReporting;
