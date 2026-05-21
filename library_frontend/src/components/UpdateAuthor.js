import React, { useState } from "react";
import axios from "axios";

function UpdateAuthor({ author, fetchAuthors }) {

  const [name, setName] = useState(author.name);
  const [email, setEmail] = useState(author.email);

  const updateAuthor = async () => {

    const token = localStorage.getItem("token");

    const data = {
      name: name,
      email: email,
    };

    try {

      await axios.put(
        `http://127.0.0.1:8000/author_details/${author.id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Author Updated");

      fetchAuthors();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="mt-2">

      <input
        type="text"
        className="form-control mt-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        className="form-control mt-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="btn btn-warning mt-2"
        onClick={updateAuthor}
      >
        Save
      </button>

    </div>
  );
}

export default UpdateAuthor;