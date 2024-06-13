
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';


const BookTable = ({books}) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-6 py-3 text-left text-gray-600 font-medium">Title</th>
        <th className="px-6 py-3 text-left text-gray-600 font-medium">Author</th>
        <th className="px-6 py-3 text-left text-gray-600 font-medium">Publish Year</th>
        <th className="px-6 py-3 text-left text-gray-600 font-medium">Actions</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book) => (
        <tr key={book._id} className="border-t border-gray-200 hover:bg-gray-50">
          <td className="px-6 py-4 text-gray-800">{book.title}</td>
          <td className="px-6 py-4 text-gray-800">{book.author}</td>
          <td className="px-6 py-4 text-gray-800">{book.publishYear}</td>
          <td className="px-6 py-4 flex space-x-4">
            <Link
              to={`/books/edit/${book._id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              <AiOutlineEdit size={20} />
            </Link>
            <Link
              to={`/books/details/${book._id}`}
              className="text-green-500 hover:text-green-700"
            >
              <BsInfoCircle size={20} />
            </Link>
            <Link
              to={`/books/delete/${book._id}`}
              className="text-red-500 hover:text-red-700"
            >
              <AiFillDelete size={20} />
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default BookTable