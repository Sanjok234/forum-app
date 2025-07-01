import React from 'react';

function PageContainer({ children, className = '', maxWidth = 'max-w-4xl' }) {
  return (
    <div className={`min-h-screen bg-gray-50 py-8`}>
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default PageContainer; 