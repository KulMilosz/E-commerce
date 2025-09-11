import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Website Headings
        "display-1": ["64px", { lineHeight: "76px", letterSpacing: "-0.01em" }],
        "display-2": ["56px", { lineHeight: "66px", letterSpacing: "-0.01em" }],
        "display-3": ["48px", { lineHeight: "58px", letterSpacing: "-0.01em" }],
        "heading-w-1": [
          "44px",
          { lineHeight: "54px", letterSpacing: "-0.01em" },
        ],
        "heading-w-2": [
          "40px",
          { lineHeight: "50px", letterSpacing: "-0.01em" },
        ],
        "heading-w-3": [
          "36px",
          { lineHeight: "46px", letterSpacing: "-0.01em" },
        ],
        "heading-w-4": [
          "32px",
          { lineHeight: "44px", letterSpacing: "-0.01em" },
        ],
        "heading-w-5": [
          "28px",
          { lineHeight: "40px", letterSpacing: "-0.01em" },
        ],
        "heading-w-6": [
          "24px",
          { lineHeight: "36px", letterSpacing: "-0.01em" },
        ],
        "heading-w-7": [
          "20px",
          { lineHeight: "30px", letterSpacing: "-0.01em" },
        ],

        // Mobile Headings
        "heading-m-1": [
          "40px",
          { lineHeight: "50px", letterSpacing: "-0.01em" },
        ],
        "heading-m-2": [
          "36px",
          { lineHeight: "46px", letterSpacing: "-0.01em" },
        ],
        "heading-m-3": [
          "32px",
          { lineHeight: "44px", letterSpacing: "-0.01em" },
        ],
        "heading-m-4": [
          "28px",
          { lineHeight: "40px", letterSpacing: "-0.01em" },
        ],
        "heading-m-5": [
          "24px",
          { lineHeight: "36px", letterSpacing: "-0.01em" },
        ],
        "heading-m-6": [
          "20px",
          { lineHeight: "30px", letterSpacing: "-0.01em" },
        ],
        "heading-m-7": [
          "18px",
          { lineHeight: "28px", letterSpacing: "-0.01em" },
        ],

        // Paragraphs
        "text-l": ["18px", { lineHeight: "28px", letterSpacing: "0" }],
        "text-m": ["16px", { lineHeight: "26px", letterSpacing: "0" }],
        "text-s": ["14px", { lineHeight: "24px", letterSpacing: "0" }],
        "text-xs": ["12px", { lineHeight: "22px", letterSpacing: "0" }],
        "text-xxs": ["10px", { lineHeight: "20px", letterSpacing: "0" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};

export default config;
