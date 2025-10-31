'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark' | 'charcoal';
export type ButtonStyle = 'solid' | 'outline' | 'ghost';
export type SearchStyle = 'rounded' | 'pill' | 'underline';

type DesignState = {
  theme: Theme;
  button: ButtonStyle;
  search: SearchStyle;
  setTheme: (t: Theme) => void;
  setButton: (b: ButtonStyle) => void;
  setSearch: (s: SearchStyle) => void;
};

const Ctx = createContext<DesignState | null>(null);

const THEME_KEY = 'gaia.theme';
const BTN_KEY = 'gaia.ui.button';
const SRCH_KEY = 'gaia.ui.search';

function read<T>(k: string, fallback: T): T {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}
function write<T>(k: string, v: T) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
}

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [button, setButton] = useState<ButtonStyle>('solid');
  const [search, setSearch] = useState<SearchStyle>('rounded');

  useEffect(() => {
    setTheme(read(THEME_KEY, 'light'));
    setButton(read(BTN_KEY, 'solid'));
    setSearch(read(SRCH_KEY, 'rounded'));
  }, []);

  useEffect(() => {
    write(THEME_KEY, theme);
    write(BTN_KEY, button);
    write(SRCH_KEY, search);
    // Optional: tag html for debugging/themes
    document.documentElement.setAttribute('data-gaia-theme', theme);
  }, [theme, button, search]);

  const value = useMemo<DesignState>(() => ({
    theme, button, search,
    setTheme, setButton, setSearch
  }), [theme, button, search]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDesign() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useDesign must be used within DesignProvider');
  return v;
}
