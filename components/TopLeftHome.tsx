"use client";
import { useContext } from "react";
import Link from "next/link";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { GaiaWordmark } from "./Brand";
export function TopLeftHome() {
  const router = useContext(AppRouterContext);
  const pathname = useContext(PathnameContext);
  if (!router) return null;
  if (!pathname) return null;
  if (pathname === "/") return null;
  return (
    <div className="fixed left-4 top-4 z-50 md:left-6 md:top-6">
      <Link
        href="/"
        aria-label="Back to GAIA Intro"
        className="inline-flex items-center gap-2 rounded-full border border-slate-900/15 bg-white/90 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate-900 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-slate-900/25 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
      >
        {/* Logo image removed per request; keep wordmark text only */}
        <span className="text-xs font-bold tracking-[0.14em] md:ml-0">
          <GaiaWordmark />
        </span>
      </Link>
    </div>
  );
}
