import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!book) {
    return (
      <div className="p-4">
        <BackButton destination="/" />
        <h1 className="text-3xl my-4">Book not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex justify-start p-4">
        <BackButton destination="/" />
      </div>
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all hover:shadow-2xl hover:scale-105">
          <div className="p-6 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 text-white">
            <h2 className="text-3xl font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg">by {book.author}</p>
            <p className="mt-2 text-lg">ID: <b>{id}</b></p>
          </div>
          <div className="p-6">
            <div className="mt-4">
              <p className="text-gray-700">
                <span className="font-semibold">Publish Year:</span> {book.publishYear}
              </p>
              <p className="mt-2 text-gray-700">
                <span className="font-semibold">Created At:</span> {new Date(book.createdAt).toLocaleString()}
              </p>
              <p className="mt-2 text-gray-700">
                <span className="font-semibold">Updated At:</span> {new Date(book.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
