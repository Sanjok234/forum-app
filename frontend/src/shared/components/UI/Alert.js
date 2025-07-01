import React from 'react';

function Alert({ type = 'info', message, className = '', onClose }) {
  const alertClasses = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  const iconClasses = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className={`border px-4 py-3 rounded flex items-center justify-between ${alertClasses[type]} ${className}`}>
      <div className="flex items-center">
        <span className={`text-lg mr-2 ${iconClasses[type]}`}>
          {icons[type]}
        </span>
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-sm font-medium hover:opacity-75"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Alert; 