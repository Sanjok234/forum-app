import React from 'react';

function FormButton({ 
  children, 
  text, 
  loading = false, 
  disabled = false, 
  variant = 'primary',
  className = '',
  ...props 
}) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {text || children}
        </div>
      ) : (
        text || children
      )}
    </button>
  );
}

export default FormButton; 