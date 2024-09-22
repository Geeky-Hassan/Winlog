import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { FaCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion, useInView } from "framer-motion";
import DOMPurify from "dompurify";

const BragItem = ({ brag, isGridView }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, {
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const height = descriptionRef.current.scrollHeight;
      setShowReadMore(height > lineHeight * 3);
    }
  }, [brag.brag_desc]);

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

  const cleanTags = (tags) => {
    let tagsArray = tags.split(",");
    if (tagsArray[0].startsWith("{") || tagsArray[0].startsWith('"')) {
      tagsArray[0] = tagsArray[0].slice(1);
    }
    if (
      tagsArray[tagsArray.length - 1].endsWith("}") ||
      tagsArray[tagsArray.length - 1].endsWith('"')
    ) {
      tagsArray[tagsArray.length - 1] = tagsArray[tagsArray.length - 1].slice(
        0,
        -1
      );
    }
    return tagsArray.map((tag) => tag.trim().replace(/^"|"$/g, ""));
  };

  const content = (
    <>
      <div className="flex items-center mb-3">
        <h3 className="text-xl font-bold text-gray-800 mr-2">
          {brag.brag_name}
        </h3>
        <CopyToClipboard
          text={brag.brag_name}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          <motion.button
            className="text-gray-500 hover:text-gray-700 ml-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaCopy />
          </motion.button>
        </CopyToClipboard>
      </div>
      {copied && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-tyrian_purple text-sm mb-2"
        >
          Copied to clipboard!
        </motion.p>
      )}
      {brag.brag_img ? (
        <motion.img
          src={getImageUrl(brag)}
          alt={brag.brag_name}
          className="w-auto max-h-[400px] object-cover rounded-lg mb-3"
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <div className="w-full h-48 bg-gradient-other flex items-center justify-center rounded-lg mb-3">
          <span className="text-white">No Image Provided</span>
        </div>
      )}
      <div className="relative mb-6">
        <div
          ref={descriptionRef}
          className={`text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-full" : "max-h-[4.5em]"
          }`}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(brag.brag_desc),
          }}
        />
        {showReadMore && (
          <div className="mt-2">
            <button
              className="btn btn-primary text-sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <div>
          <span className="font-semibold">Started:</span>{" "}
          {moment(brag.brag_start_date).format("MMM Do, YYYY")}
        </div>
        <div>
          <span className="font-semibold">
            {brag.brag_end_date ? "Ended:" : "Status:"}
          </span>{" "}
          {brag.brag_end_date
            ? moment(brag.brag_end_date).format("MMM Do, YYYY")
            : "Ongoing"}
        </div>
      </div>
      <div className="mt-4">
        <span className="font-semibold text-gray-700 block mb-2">Tags:</span>
        <div className="flex flex-wrap">
          {cleanTags(brag.brag_tags).map((tag, index) => (
            <motion.span
              key={index}
              className="inline-block bg-another_red_violet-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </>
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Changed from y: -50 to y: 50
    visible: { opacity: 1, y: 0 },
  };

  if (isGridView) {
    return (
      <motion.div
        ref={ref}
        className="p-5 border-2 border-another_red_violet-500 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col h-full"
        variants={cardVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="mb-16 flex flex-col md:flex-row"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="md:w-1/4 mb-4 md:mb-0 relative">
        <div className="flex items-center md:justify-end md:pr-8">
          <div className="w-4 h-4 bg-another_red_violet-500 rounded-full mr-2 md:mr-0 md:absolute md:right-0 md:transform md:translate-x-1/2"></div>
          <p className="text-sm font-medium text-gray-600 md:pr-8">
            {moment(brag.brag_start_date).format("MMM Do YYYY")}
          </p>
        </div>
      </div>
      <div className="md:w-3/4 md:pl-8">
        <motion.div
          className="bg-white rounded-lg shadow-xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {content}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BragItem;
