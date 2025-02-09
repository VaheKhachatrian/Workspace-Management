import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/Layouts/MainLayout.jsx";
import { Homepage } from "./pages/Homepage/homepage.jsx";
import "./pages/Homepage/homepage.css";
import "./App.css";
import "./components/NavBar/navbar.css";
import Register from "./pages/Authorization/Register.jsx";
import Login from "./pages/Authorization/Login.jsx";
import Workspace from "./pages/Workspace/workspace.jsx";
import AuthPage from "./pages/Authorization/AuthPage.jsx";

const App = () => (
  <>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="*"
        element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/workspace" element={<Workspace />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  </>
);

export default App;
