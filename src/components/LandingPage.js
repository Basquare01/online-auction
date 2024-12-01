import React from "react";
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="overlay">
        <h1>Welcome to the Online Auction System</h1>
        <p>Post an item to sell, place your bids, and win amazing deals!</p>
        <div className="buttons">
          <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>
            Login
          </button>
          <button className="btn btn-secondary" onClick={() => window.location.href = '/signup'}>
            Sign Up
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
