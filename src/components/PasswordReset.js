import React, { useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = () => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by email
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      // Update user's password
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Password reset successful!");
    } else {
      alert("Email not found. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Password Reset</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <button onClick={handleReset} style={{ padding: "10px 20px", marginTop: "10px" }}>
        Reset Password
      </button>
    </div>
  );
};

export default PasswordReset;
