import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = () => {
    // Get users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const user = existingUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    // if (user) {
    //   alert(`Welcome back, ${user.username}!`);
    //   // Optionally save the logged-in user to localStorage
    //   localStorage.setItem("loggedInUser", JSON.stringify(user));
    //   navigate("/"); // Redirect to home or another page
    // } else {
    //   alert("Invalid email or password. Please try again.");
    // }

    if (user) {
        alert(`Welcome back, ${user.username}!`);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        navigate("/home"); // Redirect to the home page
      } else {
        alert("Invalid email or password. Please try again.");
      }
      
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <button onClick={handleLogin} style={{ padding: "10px 20px", marginTop: "10px" }}>
        Login
      </button>
    </div>
  );
};

export default Login;
