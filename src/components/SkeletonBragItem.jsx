import React from "react";

const SkeletonBragItem = ({ isGridView }) => {
  const content = (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-48 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex flex-wrap">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-6 bg-gray-200 rounded-full px-3 mr-2 mb-2 w-16"
          ></div>
        ))}
      </div>
    </div>
  );

  if (isGridView) {
    return (
      <div className="p-5 border-2 border-another_red_violet-500 rounded-lg shadow-lg">
        {content}
      </div>
    );
  }

  return (
    <div className="mb-16 flex flex-col md:flex-row">
      <div className="md:w-1/4 mb-4 md:mb-0 relative">
        <div className="flex items-center md:justify-end md:pr-8">
          <div className="w-4 h-4 bg-another_red_violet-500 rounded-full mr-2 md:mr-0 md:absolute md:right-0 md:transform md:translate-x-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div className="md:w-3/4 md:pl-8">
        <div className="bg-white rounded-lg shadow-xl p-6">{content}</div>
      </div>
    </div>
  );
};

export default SkeletonBragItem;
