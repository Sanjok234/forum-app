import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute; 