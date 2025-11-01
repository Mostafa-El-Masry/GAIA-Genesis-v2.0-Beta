import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import { DAISY_THEMES } from "./daisyThemes";

export default {
  darkMode: "class", // IMPORTANT: enables Tailwind's dark: variants via .dark on <html>
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Theme attributes
    {
      pattern: /data-theme$/,
      variants: DAISY_THEMES.map((theme) => `[data-theme='${theme}']`),
    },
    // Critical utility classes
    {
      pattern: /(bg|text)-(primary|base|neutral|accent)(-content)?/,
    },
    // Theme loading state
    "theme-loading",
    // UI Components
    "btn",
    "btn-primary",
    "btn-secondary",
    "btn-accent",
    "btn-ghost",
    "dropdown",
    "dropdown-content",
    "modal",
    "modal-box",
  ],
  blocklist: ["[-:T]"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [
    typography({
      className: "prose",
      target: "modern",
    }),
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "var(--gaia-text-default)",
          "primary-content": "var(--gaia-surface)",
          "base-100": "var(--gaia-surface)",
          "base-200": "var(--gaia-surface-soft)",
          "base-300": "var(--gaia-border)",
          "base-content": "var(--gaia-text-default)",
          "--btn-text-case": "none",
        },
        dark: {
          primary: "var(--gaia-text-default)",
          "primary-content": "var(--gaia-surface)",
          "base-100": "var(--gaia-surface)",
          "base-200": "var(--gaia-surface-soft)",
          "base-300": "var(--gaia-border)",
          "base-content": "var(--gaia-text-default)",
          "--btn-text-case": "none",
        },
      },
      "cyberpunk",
      "synthwave",
      "retro",
      "night",
    ],
    darkTheme: "dark",
    base: true, // Enable base styles for better theme compatibility
    logs: process.env.NODE_ENV === "development", // Only show logs in development
  },
} satisfies Config;
