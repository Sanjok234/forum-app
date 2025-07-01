import { useCallback } from 'react';
import { useForm } from '../../../shared/hooks';
import { validateForumForm } from '../utils/validators';

export function useForumForm(initialData = { title: '', content: '' }, onSubmit) {
  const {
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldError,
    clearErrors,
    resetForm,
    validateForm,
    isValid
  } = useForm(initialData, validateForumForm);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    try {
      await onSubmit(form);
    } catch (error) {
      setFieldError('general', error.message);
    }
  }, [form, onSubmit, validateForm, setFieldError]);

  return {
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    clearErrors,
    resetForm,
    handleSubmit,
    isValid
  };
} 