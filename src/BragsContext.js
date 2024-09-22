import React, { createContext, useState, useContext } from "react";

const BragsContext = createContext();

export const BragsProvider = ({ children }) => {
  const [bragsData, setBragsData] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  return (
    <BragsContext.Provider
      value={{ bragsData, setBragsData, lastFetchTime, setLastFetchTime }}
    >
      {children}
    </BragsContext.Provider>
  );
};

export const useBrags = () => useContext(BragsContext);
