import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import toast from 'react-hot-toast';

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!author) newErrors.author = "Author is required";
    if (!publishYear) {
      newErrors.publishYear = "Publish Year is required";
    } else if (!/^\d{4}$/.test(publishYear)) {
      newErrors.publishYear = "Publish Year must be a valid year";
    }
    return newErrors;
  };

  const handleSaveBook = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .post("http://localhost:5000/api/books", data)
      .then(() => {
        setLoading(false);
        toast.success("Book created successfully");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("An error occurred. Please check the console.");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex justify-start p-2">
        <BackButton destination="/" />
      </div>
      <div className="flex-grow flex items-center justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full max-w-lg mb-4 bg-white shadow-lg rounded-xl p-8 space-y-6 transform transition-all hover:shadow-2xl">
            <h1 className="text-2xl mb-8 font-bold text-gray-900 text-center">
              Create New Book
            </h1>
            <div className="flex flex-col space-y-4">
              <label className="font-semibold text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`px-4 py-2 border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.title && (
                <span className="text-red-500">{errors.title}</span>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <label className="font-semibold text-gray-700">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={`px-4 py-2 border ${
                  errors.author ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.author && (
                <span className="text-red-500">{errors.author}</span>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <label className="font-semibold text-gray-700">
                Publish Year
              </label>
              <input
                type="number"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className={`px-4 py-2 border ${
                  errors.publishYear ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />

              {errors.publishYear && (
                <span className="text-red-500">{errors.publishYear}</span>
              )}
            </div>
            <button
              onClick={handleSaveBook}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Save Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBook;
