import React, { useEffect, useState } from "react";
import axios from "axios";
import BorrowBook from "./BorrowBook";

function BorrowList() {

  const [borrows, setBorrows] = useState([]);

  useEffect(() => {

    fetchBorrows();

  }, []);

  const fetchBorrows = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/borrow_view/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBorrows(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const returnBook = async (id) => {

    const token = localStorage.getItem("token");

    try {

      await axios.post(
        `http://127.0.0.1:8000/return_book/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBorrows();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="container mt-5">

      <BorrowBook fetchBorrows={fetchBorrows} />

      <div className="card p-4 mt-4">

        <h2>Borrowed Books</h2>

        <table className="table table-hover mt-4">

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Book</th>
              <th>Borrowed Date</th>
              <th>Return Date</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              borrows.map((borrow) => (

                <tr key={borrow.id}>

                  <td>{borrow.name}</td>
                  <td>{borrow.email}</td>
                  <td>{borrow.book}</td>
                  <td>{borrow.borrowed_date}</td>
                  <td>{borrow.return_date}</td>

                  <td>

                    <button
                      className="btn btn-success btn-custom"
                      onClick={() => returnBook(borrow.id)}
                    >
                      Return
                    </button>

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

export default BorrowList;