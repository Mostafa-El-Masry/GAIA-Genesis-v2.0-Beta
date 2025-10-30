"use client";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import NavbarSearch from "./NavbarSearch";

export default function AppBar() {
  return (
    <div className="relative">
      <header className="h-14 bg-white/15 backdrop-blur-md border-b border-white/30 shadow-lg shadow-black/10">
        <div className="mx-auto max-w-7xl px-3 h-full flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center select-none min-w-[100px]"
          >
            <img src="/gaia-intro.svg" alt="GAIA" className="h-8 w-auto" />
          </Link>
          <div className="flex-1 flex justify-center">
            <NavbarSearch />
          </div>
          <div className="min-w-[100px] flex justify-end">
            <UserMenu />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </header>
    </div>
  );
}
