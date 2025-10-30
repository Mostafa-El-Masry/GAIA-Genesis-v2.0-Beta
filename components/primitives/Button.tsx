import React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline"
  size?: "sm" | "md" | "lg"
}

const sizeClass = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-5 text-lg"
}

export default function Button({ variant = "solid", size = "md", className = "", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-md transition border"
  const solid = "bg-primary text-primary-content border-primary hover:opacity-90"
  const outline = "bg-transparent text-primary border-primary hover:bg-primary/10"
  return (
    <button
      {...props}
      className={[base, sizeClass[size], variant === "solid" ? solid : outline, className].join(" ")}
    />
  )
}
