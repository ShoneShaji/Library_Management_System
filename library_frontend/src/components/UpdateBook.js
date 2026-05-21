import React, { useState } from "react";
import axios from "axios";

function UpdateBook({ book, fetchBooks }) {

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publishedDate, setPublishedDate] = useState(book.published_date);
  const [availableCopies, setAvailableCopies] = useState(book.available_copies);

  const updateBook = async () => {

    const token = localStorage.getItem("token");

    const data = {
      title: title,
      author: author,
      published_date: publishedDate,
      available_copies: availableCopies,
    };

    try {

      await axios.put(
        `http://127.0.0.1:8000/book_details/${book.id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Updated");

      fetchBooks();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="mt-3">

      <input
        type="text"
        className="form-control mt-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        className="form-control mt-2"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="date"
        className="form-control mt-2"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
      />

      <input
        type="number"
        className="form-control mt-2"
        value={availableCopies}
        onChange={(e) => setAvailableCopies(e.target.value)}
      />

      <button
        className="btn btn-warning mt-3"
        onClick={updateBook}
      >
        Save
      </button>

    </div>
  );
}

export default UpdateBook;