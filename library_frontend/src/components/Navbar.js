import React from "react";
import {
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaSignOutAlt
} from "react-icons/fa";

function Navbar() {

  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (

    <div className="sidebar">

      <h2>Library LMS</h2>
      <ul>

        <li>
          <FaBook /> Books
        </li>

        <li>
          <FaUsers /> Authors
        </li>

        <li>
          <FaExchangeAlt /> Borrow
        </li>

        <li onClick={logoutUser}>
          <FaSignOutAlt /> Logout
        </li>

      </ul>

     </div>
  );
}

export default Navbar; 