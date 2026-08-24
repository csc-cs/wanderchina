'use client';

import { useEffect, useState } from 'react';

export interface AiEntryProps {
  onOpen?: () => void; // optional per spec; falls back to warn if missing
}

export function AiEntry({ onOpen }: AiEntryProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!onOpen) {
      console.warn('[AiEntry] onOpen callback is not provided');
    }
  }, [onOpen]);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 1500);
    const hide = setTimeout(() => setShowTooltip(false), 5500);
    return () => {
      clearTimeout(t);
      clearTimeout(hide);
    };
  }, []);

  const handleClick = () => {
    if (!onOpen) {
      console.warn('[AiEntry] onOpen callback is not provided');
      return;
    }
    console.info('[AiEntry] FAB clicked, opening assistant modal');
    onOpen();
  };

  return (
    <div
      className="fixed z-50 right-4 md:right-6 bottom-4 md:bottom-6 pb-[env(safe-area-inset-bottom)]"
    >
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-full bg-brand-ink text-white text-xs px-3 py-1.5 shadow-lg animate-fade-in motion-reduce:animate-none"
        >
          Ask AI Assistant
          <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-ink" />
        </div>
      )}
      <button
        type="button"
        onClick={handleClick}
        className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-primary text-white shadow-2xl hover:bg-indigo-700 hover:scale-105 motion-reduce:hover:scale-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        aria-label="Open AI Assistant"
      >
        <span
          className="text-2xl group-hover:rotate-12 motion-reduce:group-hover:rotate-0 motion-reduce:transition-none transition-transform"
          aria-hidden="true"
        >
          ✨
        </span>
      </button>
    </div>
  );
}