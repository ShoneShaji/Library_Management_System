import React from "react";
import Navbar from "./Navbar";
import BookList from "./BookList";
import BorrowList from "./BorrowList";
import AuthorList from "./AuthorList";

function Dashboard() {

  return (

    <div>

      <Navbar />

      <div className="main-content">

        <div className="topbar">

          <h2>Library Dashboard</h2>

        </div>

        <h3 className="section-title">Author Management</h3>

        <AuthorList />

        <h3 className="section-title">Book Management</h3>

        <BookList />

        <h3 className="section-title">Borrow Management</h3>

        <BorrowList />

      </div>

      </div>
  );
}

export default Dashboard; 
