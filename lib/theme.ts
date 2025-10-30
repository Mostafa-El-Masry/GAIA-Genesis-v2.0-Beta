export const themes = ["light", "dark", "dim"] as const

export function getTheme(): string {
  if (typeof window === "undefined") return "light"
  return localStorage.getItem("gaia.theme") || "light"
}

export function setTheme(t: string) {
  if (typeof document === "undefined") return
  document.documentElement.setAttribute("data-theme", t)
  localStorage.setItem("gaia.theme", t)
}
