import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormButton } from '../../../shared/components/Form';

function ForumActions({ 
  forumId, 
  onEdit, 
  onDelete, 
  canEdit = false, 
  canDelete = false,
  loading = false 
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      navigate(`/forums/${forumId}/edit`);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this forum?')) {
      onDelete();
    }
  };

  const handleCancel = () => {
    navigate(`/forums/${forumId}`);
  };

  return (
    <div className="flex gap-3">
      {canEdit && (
        <FormButton
          onClick={handleEdit}
          variant="outline"
          text="Edit"
          disabled={loading}
        />
      )}
      
      {canDelete && (
        <FormButton
          onClick={handleDelete}
          variant="danger"
          text="Delete"
          loading={loading}
        />
      )}
      
      <FormButton
        onClick={handleCancel}
        variant="outline"
        text="Cancel"
        disabled={loading}
      />
    </div>
  );
}

export default ForumActions; 