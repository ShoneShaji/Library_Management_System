import React, { useState } from "react";
import axios from "axios";

function BorrowBook({ fetchBorrows }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [book, setBook] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const borrowBook = async () => {

    const token = localStorage.getItem("token");

    const data = {
      name: name,
      email: email,
      book: book,
      return_date: returnDate,
    };

    try {

      await axios.post(
        "http://127.0.0.1:8000/borrow_view/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Borrowed");

      fetchBorrows();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="card p-4 mt-4">

      <h3>Borrow Book</h3>

      <input
        type="text"
        placeholder="Name"
        className="form-control mt-3"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="form-control mt-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Book ID"
        className="form-control mt-3"
        onChange={(e) => setBook(e.target.value)}
      />

      <input
        type="date"
        className="form-control mt-3"
        onChange={(e) => setReturnDate(e.target.value)}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={borrowBook}
      >
        Borrow
      </button>

    </div>
  );
}

export default BorrowBook;