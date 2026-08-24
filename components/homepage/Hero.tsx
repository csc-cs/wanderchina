'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { HERO_CONFIG } from '@/config/homepage';

export interface HeroProps {
  onAiClick?: () => void;
}

export function Hero({ onAiClick }: HeroProps) {
  return (
    <section
      className="relative min-h-[70vh] sm:min-h-screen w-full overflow-hidden pt-[env(safe-area-inset-top)]"
      aria-label="Hero"
    >
      {/* Brand-color gradient fallback (always rendered behind image so it's the visible bg if image fails) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-primary via-indigo-700 to-indigo-900"
        aria-hidden="true"
      />

      {/* Background image (on top of gradient; hides itself on error) */}
      <div className="absolute inset-0">
        <Image
          src={HERO_CONFIG.HERO_IMAGE}
          alt="China landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover motion-reduce:animate-none"
          onError={(e) => {
            console.warn('[Hero] background image failed to load');
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Gradient overlay (top: header-readable / bottom: text-readable) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" aria-hidden="true" />
      </div>

      {/* Header (transparent over hero) */}
      <Header transparent onAiClick={onAiClick} />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl h-full flex flex-col items-center justify-center text-center px-4 pt-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 mb-6 text-sm text-white animate-fade-in motion-reduce:animate-none">
          <span aria-hidden="true">🌏</span>
          <span>For English-speaking travelers</span>
        </div>

        <h1 className="text-[32px] leading-tight sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 animate-slide-up motion-reduce:animate-none">
          {HERO_CONFIG.TITLE}
          <br />
          <span className="bg-gradient-to-r from-brand-accent to-amber-300 bg-clip-text text-transparent">
            {HERO_CONFIG.TITLE_HIGHLIGHT}
          </span>
        </h1>

        <p className="max-w-2xl text-[16px] sm:text-lg text-white/80 leading-relaxed mb-8 animate-slide-up motion-reduce:animate-none line-clamp-3">
          {HERO_CONFIG.SUBTITLE}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 animate-slide-up motion-reduce:animate-none">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-brand-ink font-medium hover:bg-brand-surface transition-colors shadow-lg"
          >
            <span aria-hidden="true">📖</span>
            <span>Browse Guides</span>
          </Link>
          <button
            type="button"
            onClick={onAiClick}
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg"
          >
            <span aria-hidden="true">✨</span>
            <span>Ask the AI Planner</span>
          </button>
        </div>

        <div className="mt-12 flex items-center gap-6 text-white/80 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-brand-accent">★</span>
            <span>
              <strong className="text-white">4.9</strong> from 12,000+ travelers
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span aria-hidden="true">🌍</span>
            <span>
              <strong className="text-white">50+</strong> cities covered
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce motion-reduce:animate-none" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}