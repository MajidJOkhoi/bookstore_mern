import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const DeleteBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setLoading(false);
        setError(
          "An error occurred while fetching book. Please check the console."
        );
      });
  }, [id]);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/api/books/${id}`)
      .then(() => {
        setLoading(false);
        toast.success("Book deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error deleting book:", error);

        toast.error(
          "An error occurred while deleting book."
        );
      });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center bg-gray-100 min-h-screen">
        <BackButton destination={`/books/details/${id}`} />
        <h1 className="text-4xl my-8 font-extrabold text-gray-900">
          Delete Book
        </h1>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-6 transform transition-all hover:shadow-2xl">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex justify-between">
            <button
              onClick={() => navigate(`/`)}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ml-2"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center bg-gray-100 min-h-screen">
      <BackButton destination={`/books/details/${id}`} />
      <h1 className="text-4xl my-8 font-extrabold text-gray-900">
        Delete Book
      </h1>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-6 transform transition-all hover:shadow-2xl">
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete the book{" "}
          <span className="font-semibold">{book.title}</span>?
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 mr-2"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`/`)}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
