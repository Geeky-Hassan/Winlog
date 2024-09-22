import React from "react";
import TimelineView from "./TimelineView";
import GridView from "./GridView";
import DownloadSection from "./DownloadSection";

const BragList = ({ viewMode, displayedBrags, loading }) => (
  <div className="container mx-auto px-4 flex flex-col md:flex-row">
    {viewMode === "timeline" ? (
      <TimelineView
        brags={displayedBrags}
        loading={loading}
        DownloadSection={DownloadSection}
      />
    ) : (
      <GridView brags={displayedBrags} loading={loading} />
    )}
  </div>
);

export default BragList;
