import React, { useEffect, useState } from "react";
import axios from "axios";
import AddAuthor from "./AddAuthor";
import UpdateAuthor from "./UpdateAuthor";

function AuthorList() {

  const [authors, setAuthors] = useState([]);

  useEffect(() => {

    fetchAuthors();

  }, []);

  const fetchAuthors = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/author_view/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuthors(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const deleteAuthor = async (id) => {

    const token = localStorage.getItem("token");

    try {

      await axios.delete(
        `http://127.0.0.1:8000/author_details/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAuthors();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="container mt-5">

      <AddAuthor fetchAuthors={fetchAuthors} />

      <div className="card p-4 mt-4">

        <h2>Authors</h2>

        <table className="table table-hover mt-4">

          <thead>

            <tr>

              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {
              authors.map((author) => (

                <tr key={author.id}>

                  <td>{author.id}</td>
                  <td>{author.name}</td>
                  <td>{author.email}</td>

                  <td>

                    <button
                      className="btn btn-danger btn-custom"
                      onClick={() => deleteAuthor(author.id)}
                    >
                      Delete
                    </button>

                    <UpdateAuthor
                      author={author}
                      fetchAuthors={fetchAuthors}
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

export default AuthorList;