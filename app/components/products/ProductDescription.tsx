"use client";

import { useState } from "react";

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;

  const needsExpansion = description.length > maxLength;

  const truncatedText = needsExpansion
    ? description.substring(0, maxLength) + "..."
    : description;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <span className="text-text-m">
        {isExpanded ? description : truncatedText}
      </span>
      {needsExpansion && (
        <button
          onClick={toggleExpand}
          className="text-[#F29145] cursor-pointer mt-1 text-text-m font-medium focus:outline-none block"
        >
          {isExpanded ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
}
