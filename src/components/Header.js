import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login"); // Redirect to login page
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "#f8f9fa" }}>
      <h1>Auction System</h1>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
