import React from "react";

function Navbar() {

  const logoutUser = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  return (

    <nav className="navbar navbar-dark bg-dark p-3">

      <div className="container-fluid">

        <h3 className="text-white">
          Library Management
        </h3>

        <button
          className="btn btn-danger"
          onClick={logoutUser}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;