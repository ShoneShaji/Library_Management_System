import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Auth() {

  const [showLogin, setShowLogin] = useState(true);

  return (

    <div>

      <div className="text-center mt-4">

        <button
          className="btn btn-primary me-3"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>

        <button
          className="btn btn-success"
          onClick={() => setShowLogin(false)}
        >
          Register
        </button>

      </div>

      {
        showLogin ? <Login /> : <Register />
      }

    </div>
  );
}

export default Auth;