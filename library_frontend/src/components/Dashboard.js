import React from "react";
import Navbar from "./Navbar";
import BookList from "./BookList";
import BorrowList from "./BorrowList";
import AuthorList from "./AuthorList";

function Dashboard() {

  return (

    <div>

      <Navbar />
      <AuthorList />
      <BookList />
      <BorrowList />    

    </div>
  );
}

export default Dashboard;