import React from 'react';

function FormField({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder, 
  maxLength, 
  multiline = false, 
  rows = 4,
  required = false,
  className = '',
  ...props 
}) {
  const inputClasses = `w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    error ? 'border-red-300' : 'border-gray-300'
  } ${className}`;

  const InputComponent = multiline ? 'textarea' : 'input';
  const inputProps = multiline ? { rows } : {};

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">
        {label} {required && '*'}
      </label>
      <InputComponent
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={inputClasses}
        {...inputProps}
        {...props}
      />
      {maxLength && (
        <p className="text-sm text-gray-500 mt-1">
          {value?.length || 0}/{maxLength} characters
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

export default FormField; 