import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="p-6 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 text-white rounded-t-lg">
          <h2 className="text-3xl font-semibold">{book.title}</h2>
          <p className="mt-2 text-lg">by {book.author}</p>
          <p className="mt-2 text-lg">ID: <b>{book._id}</b></p>
        </div>
        <div className="p-6">
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
  );
};

export default BookModal;
