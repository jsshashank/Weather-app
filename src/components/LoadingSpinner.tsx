import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading flex justify-center items-center p-8">
      <div className="spinner w-10 h-10 border-4 border-gray-200 border-l-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;