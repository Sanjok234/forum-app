import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ForumCard from '../../components/ForumCard';
import { fetchUserProfile, fetchUserForums } from '../../api/user';
import NotFound from '../errors/NotFound';

function getInitials(name) {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function ProfilePage() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('posts');

  useEffect(() => {
    async function fetchProfileAndForums() {
      setLoading(true);
      setError('');
      try {
        const userData = await fetchUserProfile(user_id);
        setUser(userData);
        
        const forumsData = await fetchUserForums(user_id);
        setForums(forumsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfileAndForums();
  }, [user_id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!user) return <NotFound />;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg relative">
        {/* Avatar */}
        <div className="absolute left-8 -bottom-12 w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white z-10">
            {getInitials(user.username)}
          </div>
        </div>
      </div>
      {/* Profile Card */}
      <div className="bg-white rounded-b-lg shadow p-6 pt-16 flex flex-col sm:flex-row sm:items-center gap-6 mb-8 relative">
        <div className="sm:ml-32 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold">u/{user.username}</span>
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">ID: {user.id}</span>
          </div>
          <div className="text-gray-500 text-sm mb-2">Joined {user.created_at ? new Date(user.created_at).toLocaleDateString() : ''}</div>
          <div className="flex gap-4 text-sm text-gray-700">
            <span><span className="font-semibold">{forums.length}</span> Posts</span>
            {/* Add more stats here if needed */}
          </div>
        </div>
        {/* Create Forum Button */}
        <div className="sm:absolute sm:right-6 sm:top-6 w-full sm:w-auto mt-4 sm:mt-0 flex justify-end">
          <button
            onClick={() => navigate('/create')}
            className="border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 font-semibold px-6 py-2 rounded-full shadow transition-all duration-150 w-full sm:w-auto"
          >
            + Create Forum
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6 px-2">
        <button
          className={`py-2 px-4 font-semibold border-b-2 transition-all duration-150 ${tab === 'posts' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
          onClick={() => setTab('posts')}
        >
          Posts
        </button>
        <button
          className={`py-2 px-4 font-semibold border-b-2 transition-all duration-150 ${tab === 'about' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
          onClick={() => setTab('about')}
        >
          About
        </button>
      </div>
      {/* Tab Content */}
      <div>
        {tab === 'posts' && (
          forums.length === 0 ? (
            <div className="text-gray-500 italic">No posts yet.</div>
          ) : (
            forums.map(forum => (
              <ForumCard 
                key={forum.id} 
                {...forum} 
                onEdit={() => navigate(`/forums/${forum.id}/edit`)}
              />
            ))
          )
        )}
        {tab === 'about' && (
          <div className="bg-white rounded shadow p-6">
            <div className="mb-2"><span className="font-semibold">Username:</span> u/{user.username}</div>
            <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
            <div className="mb-2"><span className="font-semibold">User ID:</span> {user.id}</div>
            <div className="mb-2"><span className="font-semibold">Joined:</span> {user.created_at ? new Date(user.created_at).toLocaleDateString() : ''}</div>
            {/* Add more about info here if needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage; 