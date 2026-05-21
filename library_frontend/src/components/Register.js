import React, { useState } from "react";
import axios from "axios";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    const data = {
      username: username,
      password: password,
    };

    try {

      await axios.post(
        "http://127.0.0.1:8000/register/",
        data
      );

      alert("Registration Successful");

      window.location.reload();

    } catch (error) {

      alert("Registration Failed");

    }
  };

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="form-control mt-3"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mt-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-success mt-3"
          onClick={registerUser}
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;