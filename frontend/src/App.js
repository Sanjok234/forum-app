import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './features/auth/RegisterPage';
import LoginPage from './features/auth/LoginPage';
import ForumListPage from './features/forums/ForumListPage';
import CreateForumPage from './features/forums/CreateForumPage';
import ProfilePage from './features/profile/ProfilePage';
import ForumPage from './features/forums/ForumPage';
import EditForumPage from './features/forums/EditForumPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './features/errors/ErrorBoundary';
import NotFound from './features/errors/NotFound';
import Forbidden from './features/errors/Forbidden';

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="p-4 max-w-3xl mx-auto">
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forums" element={<ForumListPage />} />
              <Route path="/create" element={
                <ProtectedRoute>
                  <CreateForumPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/users/:user_id" element={<ProfilePage />} />
              <Route path="/forums/:id" element={<ForumPage />} />
              <Route path="/forums/:id/edit" element={<EditForumPage />} />
              <Route path="/" element={<ForumListPage />} />
              <Route path="/403" element={<Forbidden />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
