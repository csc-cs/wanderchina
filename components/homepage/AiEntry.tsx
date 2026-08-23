'use client';

import { useEffect, useState } from 'react';

export interface AiEntryProps {
  onOpen: () => void;
}

export function AiEntry({ onOpen }: AiEntryProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 1500);
    const hide = setTimeout(() => setShowTooltip(false), 5500);
    return () => { clearTimeout(t); clearTimeout(hide); };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-full bg-brand-ink text-white text-xs px-3 py-1.5 shadow-lg animate-fade-in"
        >
          Ask me anything about China
          <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-ink" />
        </div>
      )}
      <button
        type="button"
        onClick={onOpen}
        className="group flex items-center justify-center w-14 h-14 rounded-full bg-brand-primary text-white shadow-2xl hover:bg-indigo-700 hover:scale-110 transition-all duration-200"
        aria-label="Open AI Travel Assistant"
      >
        <span className="text-2xl group-hover:rotate-12 transition-transform" aria-hidden="true">
          ✨
        </span>
      </button>
    </div>
  );
}