'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SHELL_CONFIG } from '@/config/homepage';

export interface HeaderProps {
  transparent?: boolean;
  onAiClick?: () => void;
}

export function Header({ transparent = false, onAiClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const isTransparent = transparent && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHELL_CONFIG.HEADER_SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-md'
      }`}
      style={{ height: SHELL_CONFIG.HEADER_HEIGHT_PX }}
    >
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className={`text-xl font-bold tracking-tight ${
            isTransparent ? 'text-white' : 'text-brand-ink'
          }`}
        >
          <span className="text-brand-primary">Wander</span>
          <span className={isTransparent ? 'text-white' : 'text-brand-ink'}>China</span>
        </Link>

        <nav
          className={`hidden md:flex items-center gap-6 text-sm font-medium ${
            isTransparent ? 'text-white' : 'text-brand-ink'
          }`}
          aria-label="Primary navigation"
        >
          <Link href="/guides" className="hover:text-brand-primary transition-colors">Guides</Link>
          <Link href="/community" className="hover:text-brand-primary transition-colors">Community</Link>
          <Link href="/ai" className="hover:text-brand-primary transition-colors">AI Planner</Link>
          <button
            type="button"
            onClick={onAiClick}
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2 text-white hover:bg-indigo-700 transition-colors"
            aria-label="Open AI Travel Assistant"
          >
            <span aria-hidden="true">✨</span>
            <span>Ask AI</span>
          </button>
        </nav>

        <button
          type="button"
          className={`md:hidden ${isTransparent ? 'text-white' : 'text-brand-ink'}`}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}