import React from "react";
import BragItem from "./BragItem";
import SkeletonBragItem from "./SkeletonBragItem";

const TimelineView = ({ brags, loading, DownloadSection }) => (
  <>
    <div className="md:w-1/4 md:pr-8 mb-8 md:mb-0">
      <div className="sticky top-20">
        <h2 className="text-2xl font-bold mb-4">Download Your BragDocs</h2>
        <DownloadSection data={brags} />
      </div>
    </div>
    <div className="md:w-3/4">
      <div className="relative">
        {loading
          ? Array(6)
              .fill()
              .map((_, index) => <SkeletonBragItem key={index} />)
          : brags.map((brag) => <BragItem key={brag.brag_id} brag={brag} />)}
        <div className="absolute left-0 md:left-1/4 top-0 bottom-0 w-px bg-another_red_violet transform -translate-x-1/2 hidden md:block"></div>
      </div>
    </div>
  </>
);

export default TimelineView;
