import React from "react";
import { saveAs } from "file-saver";

const BragWordDownload = () => {
  const downloadWord = async () => {
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
    }
  };

  return (
    <button
      onClick={downloadWord}
      className="block w-full mt-3 font-semibold py-3 text-center px-4 btn btn-primary"
    >
      Download Word Document
    </button>
  );
};

export default BragWordDownload;
