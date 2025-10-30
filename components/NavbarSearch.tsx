"use client";
import { useRef, useEffect } from "react";

interface NavbarSearchProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function NavbarSearch({
  value = "",
  onChange,
}: NavbarSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && e.target === document.body) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="relative w-64 group">
      <div className="relative flex items-center">
        <div
          className="absolute left-3 text-white/80 transition-all duration-300 
                      group-focus-within:text-white group-focus-within:scale-110
                      group-hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform duration-300 group-focus-within:rotate-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-12 py-2 rounded-full
                   bg-white/10 border-2 border-white/50
                   text-sm text-white outline-none
                   transition-all duration-300 ease-out
                   shadow-[0_0_10px_rgba(255,255,255,0.1)]
                   hover:border-white/70 hover:bg-white/15
                   focus:border-white/90 focus:bg-white/20 
                   focus:shadow-[0_0_25px_rgba(255,255,255,0.25)]
                   focus:scale-[1.02]
                   group-focus-within:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 text-white/80 
                     transition-all duration-300
                     rounded-full hover:bg-white/10
                     hover:text-white
                     group-focus-within:text-white
                     group-focus-within:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
