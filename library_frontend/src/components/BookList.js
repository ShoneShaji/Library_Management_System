import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";

function BookList() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchBooks();

  }, []);

  const fetchBooks = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/book_view/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const deleteBook = async (id) => {

  const token = localStorage.getItem("token");

  try {

    await axios.delete(
      `http://127.0.0.1:8000/book_details/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchBooks();

  } catch (error) {

    console.log(error);

  }
};

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2>Books</h2>

        <AddBook fetchBooks={fetchBooks} />

        <input
            type="text"
            placeholder="Search Books"
            className="form-control mt-3"
            onChange={(e) => setSearch(e.target.value)}
            />

        <table className="table mt-4">

          <thead>

            <tr>

              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>Copies</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {
              books
            .filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((book) => (

                <tr key={book.id}>

                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.published_date}</td>
                  <td>{book.available_copies}</td>
                  <td>

                    <button
                        className="btn btn-danger"
                        onClick={() => deleteBook(book.id)}
                    >
                        Delete
                    </button>


                    <UpdateBook
                    book={book}
                    fetchBooks={fetchBooks}
                    />

                   </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default BookList;