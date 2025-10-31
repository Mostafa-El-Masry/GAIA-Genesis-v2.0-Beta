export const THEMES = ["modern", "light", "night"] as const;
export type Theme = typeof THEMES[number];
export const DEFAULT_THEME: Theme = "modern";
