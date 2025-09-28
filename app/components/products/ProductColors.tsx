"use client";

import { useState } from "react";

export default function ProductColors() {
  const [selectedColor, setSelectedColor] = useState<string | null>("white");

  const colors = [
    { name: "white", bg: "#FCFCFC", checkColor: "black" },
    { name: "black", bg: "#222327", checkColor: "white" },
  ];

  return (
    <div className="flex space-x-4">
      {colors.map((color) => {
        const isSelected = selectedColor === color.name;

        return (
          <div
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className={`relative w-15 h-15 border-2 rounded-xl cursor-pointer flex items-center justify-center`}
            style={{
              backgroundColor: color.bg,
              borderColor: "#383B42",
            }}
          >
            {isSelected && (
              <span
                className="text-xl font-bold"
                style={{ color: color.checkColor }}
              >
                ✔
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
