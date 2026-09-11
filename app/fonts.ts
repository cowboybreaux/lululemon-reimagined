import localFont from "next/font/local";

/**
 * Centralized font configuration for the lululemon Hong Kong concept project.
 * Uses the supplied TestCalibre-Semibold font located in /public/fonts/.
 */
export const calibre = localFont({
  src: "../public/fonts/TestCalibre-Semibold.otf",
  variable: "--font-calibre",
  display: "swap",
  weight: "600",
  fallback: [
    "Calibre",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});
