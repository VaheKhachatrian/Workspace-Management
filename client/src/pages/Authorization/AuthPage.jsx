import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./auth.css";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const switchToLogin = () => {
    setActiveTab("login");
  };

  const switchToRegister = () => {
    setActiveTab("register");
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Signup
        </button>
      </div>

      <div className="auth-form">
        {activeTab === "login" ? (
          <Login switchToRegister={switchToRegister}/>
        ) : (
          <Register switchToLogin={switchToLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
