import React from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate()
  return (
    <div className="homepage">
      <div className="welcome-text-container">
        <h2>Welcome to BeeWeb Task</h2>
        <p className="intro-text">Let's dive into the world of beautiful design and smooth interactions.</p>
      </div>

      <div className="info">
        <div className="info-text">
          <h3 className="l1">Discover The Project</h3>
          <p className="info-p">
            This project highlights sleek animations, modern design, and a focus on user experience.
          </p>
        </div>
      
      </div>

      <div className="cta-container">
        <button className="cta-button" onClick={() => navigate("/workspace")}>Get Started</button>
      </div>
    </div>
  );
};

export { Homepage };
