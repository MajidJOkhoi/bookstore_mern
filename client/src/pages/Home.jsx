import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BookTable from '../components/Home/BookTable';
import BookCard from '../components/Home/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center items-center gap-x-4 mb-4">
        <button 
          className={`py-2 px-4 rounded-lg ${showType === 'table' ? 'bg-sky-600 text-white' : 'bg-sky-300'}`} 
          onClick={() => setShowType('table')}
        >
          TABLE
        </button>
        <button 
          className={`py-2 px-4 rounded-lg ${showType === 'card' ? 'bg-sky-600 text-white' : 'bg-sky-300'}`} 
          onClick={() => setShowType('card')}
        >
          CARD
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-gray-800">Books List</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Link
            to="/books/create"
            className="flex w-60 items-center bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 mb-6"
          >
            <MdOutlineAddBox className="mr-2" size={28} />
            <span className="text-xl">Add New Book</span>
          </Link>
          {books.length === 0 ? (
            <p className="text-gray-500">No books available.</p>
          ) : (
            showType === 'table' ? (
              <BookTable books={books} />
            ) : (
              <BookCard books={books} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
