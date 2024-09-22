import React from "react";

const BragViewToggle = ({ viewMode, setViewMode }) => (
  <div className="space-x-4">
    <button
      onClick={() => setViewMode("timeline")}
      className={`px-4 py-2 rounded ${
        viewMode === "timeline" ? "bg-tyrian_purple text-white" : "bg-gray-200"
      }`}
    >
      Timeline View
    </button>
    <button
      onClick={() => setViewMode("grid")}
      className={`px-4 py-2 rounded ${
        viewMode === "grid" ? "bg-tyrian_purple text-white" : "bg-gray-200"
      }`}
    >
      Grid View
    </button>
  </div>
);

export default BragViewToggle;
