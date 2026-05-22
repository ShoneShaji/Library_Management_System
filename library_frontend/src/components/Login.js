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

      alert("Login Successful");

      window.location.reload();

    } catch (error) {

      alert("Invalid Login");

    }
  };

  return (

    <div>

      <input
        type="text"
        placeholder="Username"
        className="form-control mb-3 p-3"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="form-control mb-3 p-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-dark w-100 p-3 fw-bold"
        onClick={loginUser}
      >
        Login
      </button>
    </div>
  );
}

export default Login;