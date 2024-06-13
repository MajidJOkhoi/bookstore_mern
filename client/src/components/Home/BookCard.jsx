import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import BookModal from './BookModel';

const BookCard = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{book.title}</h2>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="text-gray-600 mb-4">Published in {book.publishYear}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/books/edit/${book._id}`}
                className="text-blue-500 hover:text-blue-700 transition duration-150"
              >
                <AiOutlineEdit size={24} />
              </Link>
              <button
                onClick={() => openModal(book)}
                className="text-yellow-500 hover:text-yellow-700 transition duration-150"
              >
                <AiOutlineEye size={24} />
              </button>
              <Link
                to={`/books/details/${book._id}`}
                className="text-green-500 hover:text-green-700 transition duration-150"
              >
                <BsInfoCircle size={24} />
              </Link>
              <Link
                to={`/books/delete/${book._id}`}
                className="text-red-500 hover:text-red-700 transition duration-150"
              >
                <AiFillDelete size={24} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && <BookModal book={selectedBook} onClose={closeModal} />}
    </div>
  );
};

export default BookCard;
