import React from "react";

const LoadMoreButton = ({ hasMore, allBragsLoaded, loading, loadMore }) => {
  if (!hasMore || allBragsLoaded) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={loadMore}
        className="btn btn-primary bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
