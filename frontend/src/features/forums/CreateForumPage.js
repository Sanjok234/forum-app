import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ForumForm } from './components';
import { useForumActions } from './hooks';
import { PageContainer } from '../../shared/components/Layout';

function CreateForumPage() {
  const navigate = useNavigate();
  const { createForum, createLoading } = useForumActions();

  const handleSubmit = async (formData) => {
    const forum = await createForum(formData);
    navigate(`/forums/${forum.id}`);
  };

  return (
    <PageContainer>
      <h2 className="text-2xl font-bold mb-6">Create New Forum</h2>
      <ForumForm 
        onSubmit={handleSubmit}
        submitText="Create Forum"
        loading={createLoading}
      />
    </PageContainer>
  );
}

export default CreateForumPage; 