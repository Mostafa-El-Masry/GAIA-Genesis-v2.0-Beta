'use client';

import React from 'react';
import { useDesign } from '../context/DesignProvider';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export default function Button({ className = '', children, ...rest }: Props) {
  const { button, theme } = useDesign();

  const base = 'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition focus:outline-none focus:ring focus:ring-gray-300';
  let style = '';

  if (button === 'solid') {
    style = theme === 'dark'
      ? 'bg-gray-900 text-white hover:bg-gray-800'
      : 'bg-gray-900 text-white hover:bg-gray-800';
  } else if (button === 'outline') {
    style = 'border border-gray-300 hover:border-gray-400';
  } else { // ghost
    style = 'hover:bg-gray-100';
  }

  return (
    <button className={`${base} ${style} ${className}`} {...rest}>
      {children}
    </button>
  );
}
