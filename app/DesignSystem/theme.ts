export const THEMES = [
  "modern",
  "light",
  "night",
  "cyberpunk",
  "synthwave",
  "retro",
  "dark",
] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = "modern";
