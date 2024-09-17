import { useState, useEffect } from "react";
import { GetBrags } from "../handles/HandleBrag";
import moment from "moment";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import BragPdfWrapper from "./BragPdfWrapper"; // Assuming you're using the wrapper for pre-fetching images

const Brags = () => {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("timeline");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetBrags();
        // Sort data by brag_start_date in descending order
        const sortedData = res.brags.sort(
          (a, b) => new Date(b.brag_start_date) - new Date(a.brag_start_date)
        );
        setData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brags:", error);
        setError("Failed to load brags. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getImageUrl = (brag) => {
    if (brag.brag_img) {
      return `http://127.0.0.1:8000/uploads/${brag.brag_img}`;
    } else if (brag.brag_tags && brag.brag_tags.length > 0) {
      return `https://source.unsplash.com/random/800x600?${
        brag.brag_tags.split(",")[0] || "random"
      }`;
    } else {
      return `https://source.unsplash.com/random/800x600?default`;
    }
  };

  const renderTimelineView = () => (
    <div className="container mx-auto px-4 flex flex-col md:flex-row">
      <div className="md:w-1/4 md:pr-8 mb-8 md:mb-0">
        <div className="sticky top-20">
          <h2 className="text-2xl font-bold mb-4">Download Your BragDocs</h2>
          <DownloadButtons data={data} />
        </div>
      </div>
      <div className="md:w-3/4">
        <div className="relative">
          <div className="mb-16 flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0 relative">
              <div className="flex items-center md:justify-end md:pr-8">
                <div className="w-4 h-4 bg-another_red_violet-500 rounded-full mr-2 md:mr-0 md:absolute md:right-0 md:transform md:translate-x-1/2"></div>
                <p className="text-sm font-medium text-gray-600 md:pr-8">
                  Create New BragDocs
                </p>
              </div>
            </div>
            <div className="w-50 mb-4 ms-5">
              <div className="btn btn-primary">
                <Link to="/brags">Add BragDocs</Link>
              </div>
            </div>
          </div>
          {data.map((brag) => (
            <div key={brag.brag_id} className="mb-16 flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0 relative">
                <div className="flex items-center md:justify-end md:pr-8">
                  <div className="w-4 h-4 bg-another_red_violet-500 rounded-full mr-2 md:mr-0 md:absolute md:right-0 md:transform md:translate-x-1/2"></div>
                  <p className="text-sm font-medium text-gray-600 md:pr-8">
                    {moment(brag.brag_start_date).format("MMM Do YYYY")}
                  </p>
                </div>
              </div>
              <div className="md:w-3/4 md:pl-8">
                <div className="bg-white rounded-lg shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {brag.brag_name}
                  </h3>
                  {brag.brag_img ? (
                    <img
                      src={getImageUrl(brag)}
                      alt={brag.brag_name}
                      className="w-[300px] h-auto rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-3">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                  <p className="text-gray-600 mb-2">{brag.brag_desc}</p>
                  <p className="text-gray-600 mb-2">Tags: {brag.brag_tags}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Start:</strong>{" "}
                    {moment(brag.brag_start_date).format("MMM Do YYYY")}
                    <br />
                    <strong>End:</strong>{" "}
                    {moment(brag.brag_end_date).format("MMM Do YYYY")}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute left-0 md:left-1/4 top-0 bottom-0 w-px bg-another_red_violet transform -translate-x-1/2 hidden md:block"></div>
        </div>
      </div>
    </div>
  );

  const renderGridView = () => (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {data.map((brag) => (
          <div
            key={brag.brag_id}
            className="p-5 border-2 border-another_red_violet-500 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            {brag.brag_img ? (
              <img
                src={getImageUrl(brag)}
                alt={brag.brag_name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <h2 className="text-xl font-semibold">{brag.brag_name}</h2>
            <p className="text-gray-600">{brag.brag_desc}</p>
            <p className="text-gray-600">Tags: {brag.brag_tags}</p>
            <p className="text-gray-500 mt-2">
              <strong>Start Date:</strong>{" "}
              {moment(brag.brag_start_date).format("MMMM Do YYYY")}
            </p>
            <p className="text-gray-500">
              <strong>End Date:</strong>{" "}
              {moment(brag.brag_end_date).format("MMMM Do YYYY")}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <DownloadButtons data={data} />
      </div>
    </div>
  );

  const DownloadButtons = ({ data }) => (
    <div className="space-y-4">
      <CSVLink
        filename="myBragDoc.csv"
        data={data}
        headers={[
          { label: "Brag Id", key: "brag_id" },
          { label: "Title", key: "brag_name" },
          { label: "Description", key: "brag_desc" },
          { label: "Tags", key: "brag_tags" },
          { label: "Image Path", key: "brag_img" },
          { label: "Start Date", key: "brag_start_date" },
          { label: "End Date", key: "brag_end_date" },
        ]}
        className="block w-full font-semibold py-3 text-center px-4 btn btn-primary"
      >
        Download as CSV
      </CSVLink>
      <BragPdfWrapper data={data} />
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold">Loading brags...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="py-8 pt-24">
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">All Your Brags</h1>
          <div className="space-x-4">
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 rounded ${
                viewMode === "timeline"
                  ? "bg-tyrian_purple text-white"
                  : "bg-gray-200"
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded ${
                viewMode === "grid"
                  ? "bg-tyrian_purple text-white"
                  : "bg-gray-200"
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
      </div>

      {data.length > 0 ? (
        viewMode === "timeline" ? (
          renderTimelineView()
        ) : (
          renderGridView()
        )
      ) : (
        <div className="flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Brags Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Be the first to share your brag here!
            </p>
            <Link
              to={"/brags"}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Share Your Brag
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brags;
