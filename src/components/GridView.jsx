import React from "react";
import BragItem from "./BragItem";
import SkeletonBragItem from "./SkeletonBragItem";

const GridView = ({ brags, loading }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    {loading
      ? Array(6)
          .fill()
          .map((_, index) => <SkeletonBragItem key={index} isGridView />)
      : brags.map((brag) => (
          <BragItem key={brag.brag_id} brag={brag} isGridView />
        ))}
  </div>
);

export default GridView;
