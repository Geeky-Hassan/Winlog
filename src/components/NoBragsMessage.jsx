import React from "react";
import { useNavigate } from "react-router-dom";

const NoBragsMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">No Brags Yet</h2>
        <p className="text-gray-600 mb-6">
          Share your first brag and start celebrating your achievements!
        </p>
        <button
          className="bg-red_violet-500 hover:bg-red_violet-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/brags")}
        >
          Share Your Brag
        </button>
      </div>
    </div>
  );
};

export default NoBragsMessage;
