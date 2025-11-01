export const DAISY_THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
] as const;

export type DaisyThemeName = (typeof DAISY_THEMES)[number];

// Fallback CDN to load daisyUI styles when the local build doesn't include them.
// Keep version in sync with package.json when upgrading daisyui.
export const DAISY_INTEGRITY = 'sha384-axnOdzUaIB9Ih1+nsLSHfcXeLVca00K7YEyWEOMtPP+XYcRtw1vk9n1UAWn+OC/U';

export const DAISY_FALLBACK =
  "https://cdn.jsdelivr.net/npm/daisyui@5.3.11/dist/full.css";
