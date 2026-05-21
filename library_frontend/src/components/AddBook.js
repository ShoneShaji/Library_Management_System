import React, { useState } from "react";
import axios from "axios";

function AddBook({ fetchBooks }) {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");

  const addBook = async () => {

    const token = localStorage.getItem("token");

    const data = {
      title: title,
      author: author,
      published_date: publishedDate,
      available_copies: availableCopies,
    };

    try {

      await axios.post(
        "http://127.0.0.1:8000/book_view/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Added");

      fetchBooks();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="card p-4 mt-4">

      <h3>Add Book</h3>

      <input
        type="text"
        placeholder="Book Title"
        className="form-control mt-3"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Author ID"
        className="form-control mt-3"
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="date"
        className="form-control mt-3"
        onChange={(e) => setPublishedDate(e.target.value)}
      />

      <input
        type="number"
        placeholder="Available Copies"
        className="form-control mt-3"
        onChange={(e) => setAvailableCopies(e.target.value)}
      />

      <button
        className="btn btn-success mt-3"
        onClick={addBook}
      >
        Add Book
      </button>

    </div>
  );
}

export default AddBook;