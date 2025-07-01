import React from 'react';
import { useForumForm } from '../hooks';
import { FormField, FormButton, FormError } from '../../../shared/components/Form';
import { FORUM_CONSTRAINTS } from '../constants/forumConstants';

function ForumForm({ 
  initialData = { title: '', content: '' }, 
  onSubmit, 
  submitText = 'Submit', 
  loading = false,
  className = ''
}) {
  const {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid
  } = useForumForm(initialData, onSubmit);

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <FormField
        label="Forum Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.title}
        maxLength={FORUM_CONSTRAINTS.TITLE_MAX_LENGTH}
        placeholder="Enter forum title..."
        required
      />
      
      <FormField
        label="Forum Content"
        name="content"
        value={form.content}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.content}
        maxLength={FORUM_CONSTRAINTS.CONTENT_MAX_LENGTH}
        placeholder="Describe your forum topic, ask questions, or share your thoughts..."
        multiline
        rows={8}
        required
      />
      
      <FormError error={errors.general} />
      
      <div className="flex gap-4">
        <FormButton
          type="submit"
          disabled={!isValid || loading}
          loading={loading}
          text={submitText}
          className="flex-1"
        />
      </div>
    </form>
  );
}

export default ForumForm; 