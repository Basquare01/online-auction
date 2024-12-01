import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
// import PasswordReset from "./PasswordReset"
import useIdleTimer from "./useIdleTimer";

const HomePage = () => {
  const navigate = useNavigate();

  const handleTimeout = () => {
    alert("You have been logged out due to inactivity OR Tab Chnage.");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  useIdleTimer(handleTimeout, 60000); // 1-minute timeout


  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // const HomePage = () => {
    const [items, setItems] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState({});
  
    useEffect(() => {
      const savedItems = JSON.parse(localStorage.getItem("items")) || [];
      const currentTime = Date.now();
  
      const updatedItems = savedItems.map((item) => {
        const isExpired = item.endTime <= currentTime;
        const highestBid = isExpired
          ? item.bids.reduce((max, bid) => (bid.bidAmount > max.bidAmount ? bid : max), { bidAmount: 0 })
          : null;
  
        return {
          ...item,
          isExpired,
          highestBid,
        };
      });
  
      setItems(updatedItems);
  
      // Update countdown timers every second
      const interval = setInterval(() => {
        const now = Date.now();
        const updatedTimers = savedItems.reduce((acc, item) => {
          if (item.endTime > now) {
            acc[item.id] = item.endTime - now;
          }
          return acc;
        }, {});
        setTimeRemaining(updatedTimers);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTime = (ms) => {
      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / 1000 / 60) % 60);
      const hours = Math.floor(ms / 1000 / 60 / 60);
  
      return `${hours}h ${minutes}m ${seconds}s`;
    };
  

  return (
    <div>
       <Header />
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Auction System</h1>
      <p>What would you like to do?</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button
          style={{
            padding: "20px 40px",
            fontSize: "18px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/post-item")}
        >
          Post an Item for Bidding
        </button>
        <button
          style={{
            padding: "20px 40px",
            fontSize: "18px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/place-bid")}
        >
          Place a Bid
        </button>
        <button
          style={{
            padding: "20px 40px",
            fontSize: "18px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/PasswordReset")}
        >
          Reset Password
        </button>
      </div>
    </div>

    
    <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
      <h2>Online Auction Overview</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "20px 0",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            background: item.isExpired ? "#f8f8f8" : "#fff",
            position: "relative",
          }}
        >
          {/* Real-time Countdown */}
          {!item.isExpired && timeRemaining[item.id] && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#e9ecef",
                padding: "5px 10px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {formatTime(timeRemaining[item.id])}
            </div>
          )}

          <h3>{item.itemName}</h3>
          {item.photo && (
            <img
              src={item.photo}
              alt={item.itemName}
              style={{ maxWidth: "100%", height: "auto", margin: "10px 0" }}
            />
          )}
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Starting Price:</strong> ${item.startingPrice}
          </p>
          <p>
            <strong>Status:</strong> {item.isExpired ? "Expired" : "Active"}
          </p>

          <h4>Bids:</h4>
          {item.bids.length > 0 ? (
            <ul style={{ listStyle: "none", padding: "0" }}>
              {item.bids.map((bid, index) => (
                <li key={index} style={{ margin: "5px 0" }}>
                  Username: <strong>{bid.username || "Unknown"}</strong> - Amount: <strong>${bid.bidAmount}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bids yet.</p>
          )}

          {item.isExpired && item.highestBid && (
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "#d4edda",
                border: "1px solid #c3e6cb",
                borderRadius: "8px",
                color: "#155724",
              }}
            >
              <strong>Winner:</strong> Username {item.highestBid.username || "Unknown"} with a bid of $
              {item.highestBid.bidAmount}
              <span role="img" aria-label="Trophy" style={{ marginLeft: "10px" }}>
                🏆
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default HomePage;
