import React from 'react';

function ContentWrapper({ children, className = '', maxWidth = 'max-w-2xl' }) {
  return (
    <div className={`${maxWidth} mx-auto ${className}`}>
      {children}
    </div>
  );
}

export default ContentWrapper; 