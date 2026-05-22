import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Auth() {

  const [showLogin, setShowLogin] = useState(true);

  return (

    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f172a, #1e3a8a)",
      }}
    >

      <div
        className="card shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius: "20px",
          border: "none",
        }}
      >

        <h2 className="text-center mb-4 fw-bold">
          Library Management System
        </h2>

        <div className="d-flex justify-content-center mb-4">

          <button
            className={`btn me-2 ${showLogin ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <button
            className={`btn ${!showLogin ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setShowLogin(false)}
          >
            Register
          </button>

        </div>

        {
          showLogin ? <Login /> : <Register />
        }

      </div>

    </div>
    );
}

export default Auth;