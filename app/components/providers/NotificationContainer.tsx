"use client";

import React from "react";
import { useNotification, Notification } from "./NotificationProvider";
import Image from "next/image";

const Toast: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { removeNotification } = useNotification();

  const getIcon = () => {
    switch (notification.type) {
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

  const getBgColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-600";
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

  return (
    <div
      className={`${getBgColor()} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-80 max-w-96 animate-in slide-in-from-right-full duration-300`}
    >
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        <span className="text-sm font-bold">{getIcon()}</span>
      </div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{notification.title}</h4>
        <p className="text-xs opacity-90">{notification.message}</p>
      </div>
      
      <button
        onClick={() => removeNotification(notification.id)}
        className="flex-shrink-0 w-5 h-5 flex items-center justify-center hover:bg-white hover:bg-opacity-20 rounded transition-colors"
      >
        <span className="text-xs">✕</span>
      </button>
    </div>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
