import React, { useState } from "react";
import BragWordDownload from "./BragWordDownload";
import BragPDFDownload from "./BragPDFDownload";

const DownloadSection = ({ data }) => {
  const [isWordLoading, setIsWordLoading] = useState(false);
  const [isPDFLoading, setIsPDFLoading] = useState(false);

  return (
    <div className="space-y-4">
      <BragWordDownload
        isLoading={isWordLoading}
        setIsLoading={setIsWordLoading}
      />
      <BragPDFDownload
        isLoading={isPDFLoading}
        setIsLoading={setIsPDFLoading}
      />
    </div>
  );
};

export default DownloadSection;
