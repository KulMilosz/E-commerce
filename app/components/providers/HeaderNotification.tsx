"use client";

import React from "react";
import { useNotification } from "./NotificationProvider";

export const HeaderNotification: React.FC = () => {
  const { currentNotification, hideNotification } = useNotification();

  if (!currentNotification) return null;

  const getBgColor = () => {
    switch (currentNotification.type) {
      case "success":
        return "bg-[#295B40] border-1 border-[#22C55E]";
      case "error":
        return "bg-red-600";
      case "warning":
        return "bg-yellow-600";
      case "info":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const getIcon = () => {
    switch (currentNotification.type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "ℹ";
    }
  };

  return (
    <div
      className={`${getBgColor()} text-white px-4 py-2 rounded-lg flex items-center gap-2 animate-in slide-in-from-top duration-300 w-full`}
    >
      <div className="flex items-center justify-center border-1 rounded-full w-6 h-6 border-[#86EFAD]">
        <span className="text-sm font-bold text-[#86EFAD]">{getIcon()}</span>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>
          <span className="text-text-l font-medium">
            {currentNotification.message}
          </span>
        </div>
        <div>
          <button
            onClick={hideNotification}
            className="ml-2  hover:bg-opacity-20 rounded p-1 "
          >
            <span className="text-text-l cursor-pointer text-[#FCFCFC]">✕</span>
          </button>
        </div>
      </div>
    </div>
  );
};




