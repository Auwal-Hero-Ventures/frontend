import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './App.css';

const Home = () => {
  const [userTokens, setUserTokens] = useState('0');
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    // Simulate loading user data and tokens from local storage or an API
    const tokens = localStorage.getItem('userTokens') || '0';
    setUserTokens(tokens);
    // Future enhancement: Load user name and tokens from an authenticated API call
  }, []);

  const generateTokens = () => {
    console.log('Tokens generated!');
    // Placeholder for actual token generation logic connected to an API
  };

  const mapContainerStyle = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: -34.397,
    lng: 150.644
  };

  return (
    <div id="background-container">
      <section>
        <h2>Welcome to WasteToken</h2>
        <p>
          WasteToken is a platform for waste collection. You can find the nearest waste collection point to you, generate tokens for your waste, redeem your tokens for rewards, and report waste that has been illegally dumped. WasteToken is a new cryptocurrency that aims to help us reduce waste and create a more sustainable future.
        </p>
      </section>

      <section>
        <h2>Dear User, {userName}</h2>
        <p>Your Token Balance: {userTokens} tokens</p>
        <button onClick={generateTokens} className="green-oval-button">Generate Tokens</button>
      </section>

      {/* Updated Google Maps Integration */}
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
        >
          {/* Additional map features like markers can be added here */}
        </GoogleMap>
      </LoadScript>

      <p>
        WasteToken is still in its early stages, but it has the potential to make a real difference in the fight against waste. By using WasteToken, we can all help to create a cleaner, healthier planet for future generations.
      </p>
    </div>
  );
};

export default Home;
