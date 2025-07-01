import { Link } from 'react-router-dom';

export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-4">
        <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v.01M17 8V7a5 5 0 00-10 0v1M5 8h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
      <p className="text-gray-600 mb-6">You don't have permission to view this page.</p>
      <Link
        to="/dashboard"
        className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Back to Dashboard
      </Link>
    </div>
  );
} 