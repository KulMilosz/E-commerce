"use client";

import React, { useState, useRef, useEffect } from "react";
import { HorizontalSliderProps } from "@/app/types";

export default function HorizontalSlider({
  children,
  title,
  seeAllText = "See All",
  className = "",
}: HorizontalSliderProps) {
  const [canScroll, setCanScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScroll(el.scrollWidth > el.clientWidth);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-[1360px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-heading-m-4 font-medium">{title}</h2>
          {canScroll && (
            <button
              onClick={() => {
                scrollRef.current?.scrollTo({
                  left: scrollRef.current.scrollWidth,
                  behavior: "smooth",
                });
              }}
              className="text-text-m font-medium text-[#F29145] flex items-center gap-2 hover:text-[#F29145] transition-colors duration-300 cursor-pointer"
            >
              {seeAllText}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-100"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div ref={scrollRef} className="flex gap-6 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
