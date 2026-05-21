import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    const data = {
      username: username,
      password: password,
    };

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        data
      );

      localStorage.setItem("token", response.data.access);

      window.location.reload();

    } catch (error) {

      alert("Invalid Login");

    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4">

        <h2>Login</h2>

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
          className="btn btn-primary mt-3"
          onClick={loginUser}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;