import React, { useState } from "react";
import { saveAs } from "file-saver";

const BragPDFDownload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadPDF = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/download_brags_pdf", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        saveAs(blob, "brags.pdf");
      } else {
        console.error("Failed to download PDF document");
      }
    } catch (error) {
      console.error("Error downloading PDF document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={downloadPDF}
      className="block w-full mt-3 font-semibold py-3 text-center px-4 btn btn-primary"
      disabled={isLoading}
    >
      {isLoading ? "Downloading..." : "Download PDF Document"}
    </button>
  );
};

export default BragPDFDownload;
