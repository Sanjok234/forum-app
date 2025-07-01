import { useState, useCallback } from 'react';

export function useForm(initialData = {}, validator = null) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur if validator is provided
    if (validator) {
      const fieldErrors = validator(form);
      if (fieldErrors[name]) {
        setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
      }
    }
  }, [form, validator]);

  const setFieldValue = useCallback((name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const resetForm = useCallback((newData = initialData) => {
    setForm(newData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  const validateForm = useCallback(() => {
    if (!validator) return {};
    
    const validationErrors = validator(form);
    setErrors(validationErrors);
    return validationErrors;
  }, [form, validator]);

  const isValid = Object.keys(errors).length === 0 || 
    Object.values(errors).every(error => !error);

  return {
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    clearErrors,
    resetForm,
    validateForm,
    isValid
  };
} 