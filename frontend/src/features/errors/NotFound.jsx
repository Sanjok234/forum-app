import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center bg-gray-50 px-10 pt-10">
      <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Back to Home
      </Link>
    </div>
  );
} 