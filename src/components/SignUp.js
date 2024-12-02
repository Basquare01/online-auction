import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignUp = () => {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if email is already registered
    if (existingUsers.some(user => user.email === userData.email)) {
      alert("Email is already registered!");
      return;
    }

    // Add new user to the array and save to localStorage
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Sign-up successful!");
    setUserData({ username: "", email: "", password: "" });
    navigate("/login");
    // localStorage.clear();

  };
  // localStorage.clear();

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={userData.username}
        onChange={handleChange}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <button onClick={handleSignUp} style={{ padding: "10px 20px", marginTop: "10px" }}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
