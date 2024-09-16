"use client";
import {useState, useEffect} from "react";
export const useWindowSize = () => {
  const [screenWidth, setScreenWidth] = useState(320);

  useEffect(() => {
    if (typeof window !== "undefined") {
    const handleResize = () => {
    // Get the screen width
    const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
    };
    const handleReload = () => {
      // Get the screen width
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
    };

    // Attach the event listener to the window for resizing
    window.addEventListener("reload", handleReload);
    window.addEventListener("resize", handleResize);

    // Call the handleResize function once to get the initial screen width
    handleReload();
    handleResize();

    // Cleanup the event listener when the component is unmounted

    return () => {
        window.removeEventListener("reload", handleReload);
        window.removeEventListener("resize", handleResize);
    };
}
  }, []);
  return screenWidth;
};
