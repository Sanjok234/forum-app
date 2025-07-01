import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ForumForm } from './components';
import { useForumActions } from './hooks';
import { PageContainer } from '../../shared/components/Layout';
import { LoadingSpinner, Alert } from '../../shared/components/UI';

function EditForumPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchForum, updateForum, fetchLoading, updateLoading, fetchError, updateError } = useForumActions();
  const [initialData, setInitialData] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function loadForum() {
      try {
        const forum = await fetchForum(id);
        setInitialData({ title: forum.title, content: forum.content });
      } catch (err) {
        // Error handled by fetchError
      }
    }
    loadForum();
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (formData) => {
    await updateForum(id, formData);
    setSuccess('Forum updated successfully!');
    setTimeout(() => {
      navigate(`/forums/${id}`);
    }, 1200);
  };

  if (fetchLoading || !initialData) return <LoadingSpinner size="lg" className="mt-12" />;
  if (fetchError) return <Alert type="error" message={fetchError} className="mt-12" />;

  return (
    <PageContainer>
      <h2 className="text-2xl font-bold mb-6">Edit Forum</h2>
      {success && <Alert type="success" message={success} className="mb-4" />}
      <ForumForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitText="Update Forum"
        loading={updateLoading}
      />
      <div className="mt-4">
        <button
          type="button"
          onClick={() => navigate(`/forums/${id}`)}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </PageContainer>
  );
}

export default EditForumPage; 