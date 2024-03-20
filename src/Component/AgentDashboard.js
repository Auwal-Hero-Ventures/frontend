import React, { useState } from 'react';

const AgentDashboard = () => {
  const [customerUsername, setCustomerUsername] = useState('');
  const [wasteAmount, setWasteAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGenerateTokens = async () => {
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/generate-tokens-for-customer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ customerUsername, wasteAmount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate tokens.");
      }

      setSuccessMessage("Tokens successfully generated for the customer.");
      setCustomerUsername('');
      setWasteAmount('');
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Generate Tokens for Customer</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <input
        type="text"
        placeholder="Customer Username"
        value={customerUsername}
        onChange={(e) => setCustomerUsername(e.target.value)}
      />
      <input
        type="number"
        placeholder="Waste Amount (kg)"
        value={wasteAmount}
        onChange={(e) => setWasteAmount(e.target.value)}
      />
      <button onClick={handleGenerateTokens}>Generate Tokens</button>
    </div>
  );
};

export default AgentDashboard;
