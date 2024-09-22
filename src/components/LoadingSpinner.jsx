import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-purple-200 border-2 rounded-full"></div>
        <div className="w-20 h-20 border-red_violet-500 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
