import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9f9f9",
        "on-background": "#1b1b1b",
        surface: "#f9f9f9",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "surface-container-low": "#f3f3f3",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#e2e2e2",
        "on-surface": "#1b1b1b",
        "on-surface-variant": "#4b4731",
        primary: "#6a5f00",
        "on-primary": "#ffffff",
        "primary-container": "#ffe600",
        "on-primary-container": "#726600",
        secondary: "#b60055",
        "on-secondary": "#ffffff",
        "secondary-container": "#e4006c",
        "on-secondary-container": "#fffbff",
        "secondary-fixed": "#ffd9e0",
        "secondary-fixed-dim": "#ffb1c3",
        tertiary: "#006877",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#abefff",
        "tertiary-fixed": "#a5eeff",
        "tertiary-fixed-dim": "#00daf8",
        outline: "#7c775f",
        "outline-variant": "#cdc7aa",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "inverse-surface": "#303030",
        "primary-fixed": "#fde400",
        "primary-fixed-dim": "#dec800",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        xs: "4px",
        sm: "16px",
        md: "32px",
        lg: "64px",
        xl: "128px",
        gutter: "24px",
        base: "8px",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "headline-lg": [
          "80px",
          {
            lineHeight: "1.0",
            letterSpacing: "-0.02em",
            fontWeight: "900",
          },
        ],
        "headline-lg-mobile": [
          "48px",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.01em",
            fontWeight: "900",
          },
        ],
        "headline-md": [
          "40px",
          {
            lineHeight: "1.2",
            fontWeight: "800",
          },
        ],
        "headline-sm": [
          "24px",
          {
            lineHeight: "1.2",
            fontWeight: "800",
          },
        ],
        "body-lg": [
          "20px",
          {
            lineHeight: "1.6",
            fontWeight: "500",
          },
        ],
        "body-md": [
          "16px",
          {
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
        "label-xl": [
          "18px",
          {
            lineHeight: "1.0",
            fontWeight: "700",
          },
        ],
        "label-md": [
          "14px",
          {
            lineHeight: "1.0",
            fontWeight: "700",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
