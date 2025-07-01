import React, { useEffect, useState } from 'react';
import ForumCard from '../../components/ForumCard';
import { fetchForums } from '../../api/forum';

function ForumListPage() {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadForums() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchForums();
        // Sort forums by creation date, newest first
        const sortedForums = data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setForums(sortedForums);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadForums();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Forum List</h2>
      {loading && <div>Loading forums...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && forums.length === 0 && <div>No forums found.</div>}
      {!loading && !error && forums.map(forum => (
        <ForumCard key={forum.id} id={forum.id} {...forum} />
      ))}
    </div>
  );
}

export default ForumListPage; 