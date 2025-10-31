'use client';

/**
 * Baseline primitive Button
 * - Single default style for Phase 5 baseline
 */
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export default function Button({ className = "", children, label, ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition " +
    "bg-gray-900 text-white hover:bg-gray-800 active:translate-y-px focus:outline-none focus:ring focus:ring-gray-300";

  return (
    <button {...props} className={`${base}${className ? " " + className : ""}`}>
      {children ?? label}
    </button>
  );
}
