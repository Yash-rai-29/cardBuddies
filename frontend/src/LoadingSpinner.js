import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="flex space-x-2 animate-bounce">
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
