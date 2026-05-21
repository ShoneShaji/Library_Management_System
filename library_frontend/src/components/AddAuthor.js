import React, { useState } from "react";
import axios from "axios";

function AddAuthor({ fetchAuthors }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addAuthor = async () => {

    const token = localStorage.getItem("token");

    const data = {
      name: name,
      email: email,
    };

    try {

      await axios.post(
        "http://127.0.0.1:8000/author_view/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Author Added");

      fetchAuthors();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="card p-4 mt-4">

      <h3>Add Author</h3>

      <input
        type="text"
        placeholder="Author Name"
        className="form-control mt-3"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Author Email"
        className="form-control mt-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={addAuthor}
      >
        Add Author
      </button>

    </div>
  );
}

export default AddAuthor;