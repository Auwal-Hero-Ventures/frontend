import React, { useState, useEffect } from 'react';
import './App.css';

const TokenGeneration = () => {
  const [userName, setUserName] = useState('Guest'); // Placeholder, update based on auth
  const [tokenBalance, setTokenBalance] = useState(0);
  const [wasteAmount, setWasteAmount] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [error, setError] = useState('');

  // Fetch the current token balance on component mount
  useEffect(() => {
    // Here you would fetch the user's current token balance from the backend
    // For demonstration, we'll pretend it's directly available
    // setTokenBalance(fetchedBalance);
  }, []);

  const generateTokens = async () => {
    setError('');
    if (!wasteAmount || wasteAmount <= 0) {
      setError("Please enter a valid waste amount.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/generate-tokens/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Adjust based on your auth system
        },
        body: JSON.stringify({ wasteAmount }),
      });

      if (!response.ok) {
        // If the server responds with an error status, throw an error
        const data = await response.json();
        throw new Error(data.error || "Failed to generate tokens.");
      }

      const data = await response.json();
      setGeneratedToken(data.generatedTokens);
      setTokenBalance(data.newBalance); // Assuming the backend sends back the new balance
      setWasteAmount(''); // Reset the input field
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    }
  };

  return (
    <div className="App">
      {/* UI elements remain unchanged */}
    </div>
  );
};

export default TokenGeneration;
