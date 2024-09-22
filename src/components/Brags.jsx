import React, { useState, useEffect, useCallback } from "react";
import { useBrags } from "../BragsContext";
import BragList from "./BragList";
import BragViewToggle from "./BragViewToggle";
import LoadMoreButton from "./LoadMoreButton";
import { fetchBrags } from "./FetchBrags";
import LoadingSpinner from "./LoadingSpinner";
import NoBragsMessage from "./NoBragsMessage";

const Brags = () => {
  const { bragsData, setBragsData, lastFetchTime, setLastFetchTime } =
    useBrags();
  const [viewMode, setViewMode] = useState("timeline");
  const [loading, setLoading] = useState(false); // Changed to false initially
  const [error, setError] = useState(null);
  const [displayedBrags, setDisplayedBrags] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [allBragsLoaded, setAllBragsLoaded] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [dataFetched, setDataFetched] = useState(false); // New state to track if data has been fetched
  const [noBrags, setNoBrags] = useState(false);

  const BRAGS_PER_PAGE = 6;
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  const fetchData = useCallback(
    async (force = false) => {
      if (noBrags && !force) {
        console.log("No brags, skipping fetch");
        return;
      }

      const currentTime = new Date().getTime();
      const timeSinceLastFetch = lastFetchTime
        ? currentTime - lastFetchTime
        : Infinity;

      console.log("Fetch attempt:", fetchCount + 1);
      console.log("Time since last fetch:", timeSinceLastFetch);
      console.log("Cache duration:", CACHE_DURATION);
      console.log("Force fetch:", force);

      if (
        !force &&
        bragsData.length > 0 &&
        timeSinceLastFetch < CACHE_DURATION
      ) {
        console.log("Using cached data");
        setDisplayedBrags(bragsData.slice(0, BRAGS_PER_PAGE));
        setHasMore(bragsData.length > BRAGS_PER_PAGE);
        setDataFetched(true);
        return;
      }

      if (loading) {
        console.log("Already loading, skipping fetch");
        return;
      }

      setLoading(true);
      setFetchCount((prev) => prev + 1);

      try {
        console.log("Fetching new data");
        const allBrags = await fetchBrags();
        console.log("Fetched brags:", allBrags.length);
        setBragsData(allBrags);
        setDisplayedBrags(allBrags.slice(0, BRAGS_PER_PAGE));
        setHasMore(allBrags.length > BRAGS_PER_PAGE);
        setAllBragsLoaded(allBrags.length <= BRAGS_PER_PAGE);
        setLastFetchTime(currentTime);
        setNoBrags(allBrags.length === 0);
      } catch (error) {
        console.error("Error fetching brags:", error);
        setError("Failed to load brags. Please try again later.");
      } finally {
        setLoading(false);
        setDataFetched(true);
      }
    },
    [
      setBragsData,
      setLastFetchTime,
      bragsData,
      lastFetchTime,
      CACHE_DURATION,
      loading,
      fetchCount,
      noBrags,
    ]
  );

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
    }
  }, [fetchData, dataFetched]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const currentlyDisplayed = displayedBrags.length;
      const remainingBrags = bragsData.length - currentlyDisplayed;
      const bragsToAdd = Math.min(remainingBrags, BRAGS_PER_PAGE);

      setDisplayedBrags((prevDisplayed) => [
        ...prevDisplayed,
        ...bragsData.slice(currentlyDisplayed, currentlyDisplayed + bragsToAdd),
      ]);

      if (currentlyDisplayed + bragsToAdd >= bragsData.length) {
        setHasMore(false);
        setAllBragsLoaded(true);
      }
    }
  };

  // Function to force refresh data after CRUD operations
  const refreshData = () => {
    setNoBrags(false);
    fetchData(true);
  };

  if (loading && !dataFetched) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (dataFetched && (noBrags || bragsData.length === 0)) {
    return <NoBragsMessage />;
  }

  return (
    <div className="py-8 pt-24">
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">All Your Brags</h1>
          <BragViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      <BragList
        viewMode={viewMode}
        displayedBrags={displayedBrags}
        loading={loading}
      />
      {!allBragsLoaded && (
        <LoadMoreButton
          hasMore={hasMore}
          allBragsLoaded={allBragsLoaded}
          loading={loading}
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default React.memo(Brags);
