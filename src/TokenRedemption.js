// TokenRedemption.js
import React, { useState } from 'react';
import './App.css'; // Import your existing styles

const TokenRedemption = () => {
  const [tokensToRedeem, setTokensToRedeem] = useState('');
  const [redemptionStatus, setRedemptionStatus] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleRedeemButtonClick = () => {
    const token = parseInt(tokensToRedeem) || 0;
    if (token > 0) {
      setRedemptionStatus(token >= 20000 ? 'Redeemed successfully' : 'Insufficient tokens');
      setShowResult(true);
    }
  };

  const handleRiceRedemptionButtonClick = () => {
    setRedemptionStatus('Redeemed 1 bag of rice');
    setShowResult(true);
  };

  const handleRechargeCardRedemptionButtonClick = () => {
    setRedemptionStatus('Redeemed a recharge card');
    setShowResult(true);
  };

  return (
    <div className="token-section redeem-section">
      <header>
        <h1>Token Redemption</h1>
      </header>
      <main>
        <section>
          <h2>Redeem Tokens</h2>
          <form>
            <label htmlFor="tokens-to-redeem">Tokens to Redeem:</label>
            <input
              type="number"
              id="tokens-to-redeem"
              name="tokens-to-redeem"
              value={tokensToRedeem}
              onChange={(e) => setTokensToRedeem(e.target.value)}
              required
            />
            <button type="button" onClick={handleRedeemButtonClick}>Redeem</button>
          </form>
          {showResult && <div id="redemption-result"><p>Redemption status: <span id="redemption-status">{redemptionStatus}</span></p></div>}
        </section>
        <section>
          <h2>Redeem Options</h2>
          <p>Redeem one bag of rice for 20,000 tokens</p>
          <button type="button" onClick={handleRiceRedemptionButtonClick}>Redeem Rice</button>
          <p>Redeem a recharge card with tokens</p>
          <button type="button" onClick={handleRechargeCardRedemptionButtonClick}>Redeem Recharge Card</button>
          <p>Redeem housing equipment with your tokens. Call this number: 08063797962</p>
          <p>Redeem for course registration</p>
        </section>
      </main>
      
    </div>
  );
};

export default TokenRedemption;
