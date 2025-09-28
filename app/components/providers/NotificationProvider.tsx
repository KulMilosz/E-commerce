"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Notification, NotificationContextType, NotificationProviderProps } from "@/app/types";

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

let globalShowNotification: ((notification: Omit<Notification, "id">) => void) | null = null;

export const showNotification = (notification: Omit<Notification, "id">) => {
  if (globalShowNotification) {
    globalShowNotification(notification);
  } else {
    console.warn("NotificationProvider not initialized");
  }
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 3000,
    };

    setCurrentNotification(newNotification);

    setTimeout(() => {
      setCurrentNotification(null);
    }, newNotification.duration);
  }, []);

  const hideNotification = useCallback(() => {
    setCurrentNotification(null);
  }, []);

  React.useEffect(() => {
    globalShowNotification = showNotification;
    return () => {
      globalShowNotification = null;
    };
  }, [showNotification]);

  return (
    <NotificationContext.Provider
      value={{
        currentNotification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
