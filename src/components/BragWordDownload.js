import React, { useState } from "react";
import { saveAs } from "file-saver";

const BragWordDownload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadWord = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://127.0.0.1:8000/download_brags_word",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        saveAs(blob, "brags.docx");
      } else {
        console.error("Failed to download Word document");
      }
    } catch (error) {
      console.error("Error downloading Word document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={downloadWord}
      className="block w-full mt-3 font-semibold py-3 text-center px-4 btn btn-primary"
      disabled={isLoading}
    >
      {isLoading ? "Downloading..." : "Download Word Document"}
    </button>
  );
};

export default BragWordDownload;
