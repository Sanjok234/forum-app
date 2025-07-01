import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Navbar() {
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-600 text-white shadow mb-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        <Link to="/" className="font-bold text-xl tracking-tight hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded transition">Forum Site</Link>
        <button
          className="md:hidden flex items-center px-2 py-1 border border-blue-200 rounded text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={handleMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul
          className={`flex-col md:flex-row md:flex gap-4 list-none p-0 m-0 items-center bg-blue-600 md:bg-transparent absolute md:static left-0 w-full md:w-auto top-16 md:top-auto z-20 transition-all duration-200 ease-in-out ${menuOpen ? 'flex' : 'hidden'} md:flex`}
        >
          <li><Link className="block px-4 py-2 rounded hover:bg-blue-700 transition" to="/forums" onClick={() => setMenuOpen(false)}>Forum List</Link></li>
          <li><Link className="block px-4 py-2 rounded hover:bg-blue-700 transition" to="/create" onClick={() => setMenuOpen(false)}>Create Forum</Link></li>
          {user ? (
            <>
              {user.id && (
                <li><Link className="block px-4 py-2 rounded hover:bg-blue-700 transition" to={`/users/${user.id}`} onClick={() => setMenuOpen(false)}>My Public Profile</Link></li>
              )}
              <li className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-blue-700 px-3 py-1 rounded w-full md:w-auto">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{user.username}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-sm px-4 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto text-left md:text-center"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link className="block px-4 py-2 rounded hover:bg-blue-700 transition" to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
              <li><Link className="block px-4 py-2 rounded hover:bg-blue-700 transition" to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 