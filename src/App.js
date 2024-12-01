import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import HomePage from "./components/HomePage";
import PostItem from "./components/PostItem";
import PlaceBid from "./components/PlaceBid";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/post-item" element={<PostItem />} />
        <Route path="/place-bid" element={<PlaceBid />} />
      </Routes>
    </Router>
  );
};

export default App;
