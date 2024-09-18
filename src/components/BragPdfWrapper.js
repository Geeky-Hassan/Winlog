import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BragPdf from "./BragPDF";

// Helper function to convert blob to base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Function to fetch image with timeout and retries
const fetchImageWithTimeout = async (url, timeout = 5000, retries = 2) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchWithTimeout = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      controller.abort();
      reject(new Error("Image fetch timeout"));
    }, timeout);

    fetch(url, {
      signal,
      mode: "cors", // Add this line
      credentials: "include", // Add this line if your server requires credentials
    })
      .then((response) => {
        clearTimeout(timer);
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Failed to load image");
        }
      })
      .then(resolve)
      .catch(reject);
  });

  for (let i = 0; i < retries; i++) {
    try {
      return await fetchWithTimeout;
    } catch (error) {
      console.warn(`Retry ${i + 1} for image failed:`, error);
      if (i === retries - 1) throw error;
    }
  }
};

const BragPdfWrapper = ({ data }) => {
  const [logoBase64, setLogoBase64] = useState(null);
  const [bragImages, setBragImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogoAndImages = async () => {
      try {
        // Fetch and convert the logo
        const logoBlob = await fetchImageWithTimeout(
          "http://localhost:3000/static/media/logo.ada062dc3bf549515828.png"
        );
        const logoBase64 = await blobToBase64(logoBlob);
        setLogoBase64(logoBase64);

        // Fetch and convert all brag images
        const imagesPromises = data.map(async (brag) => {
          if (brag.brag_img) {
            try {
              const imageBlob = await fetchImageWithTimeout(
                `http://127.0.0.1:8000/uploads/${brag.brag_img}`
              );
              return await blobToBase64(imageBlob);
            } catch (error) {
              console.error("Failed to fetch brag image:", error);
              return null;
            }
          }
          return null;
        });

        const images = await Promise.all(imagesPromises);
        setBragImages(images);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images or logo:", err);
        setError("Failed to load all assets.");
        setLoading(false);
      }
    };

    fetchLogoAndImages();
  }, [data]);

  if (loading) {
    return <div>Loading PDF...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PDFDownloadLink
      document={
        <BragPdf data={data} logoBase64={logoBase64} bragImages={bragImages} />
      }
      fileName="brag.pdf"
    >
      {({ loading }) =>
        loading ? (
          <span className="block w-full mt-3 font-semibold py-3 text-center px-4 btn btn-primary">
            Loadind Pdf.....
          </span>
        ) : (
          <span className="block w-full mt-3 font-semibold py-3 text-center px-4 btn btn-primary">
            Download Pdf
          </span>
        )
      }
    </PDFDownloadLink>
  );
};

export default BragPdfWrapper;
