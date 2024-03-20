import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = async () => {
    try {
      // Replace 'http://localhost:8000/api/login/' with your actual login API endpoint
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid credentials');
      }

      // Assuming the login response includes the token and user role
      console.log('Login successful:', data);
      // Store the token in localStorage or sessionStorage for future authenticated requests
      localStorage.setItem('authToken', data.token);

      // Redirect based on the user's role
      // You might need to adjust how you retrieve the role from the response based on your backend's structure
      const dashboardPath = data.role === 'agent' ? '/agent-dashboard' : '/customer-dashboard';
      navigate(dashboardPath);
    } catch (err) {
      console.error('SignIn error:', err);
      setError(err.message || 'An error occurred during sign-in.');
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
        <label htmlFor="email">Username:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="button" onClick={handleSignIn}>Sign In</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default SignIn;
