'use client';

import { useEffect, useRef } from 'react';

export interface AiAssistantModalProps {
  open: boolean;
  onClose: () => void;
}

export function AiAssistantModal({ open, onClose }: AiAssistantModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // Capture the previously focused element so we can restore focus on close
    previousFocusRef.current = (document.activeElement as HTMLElement) ?? null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      // Restore focus to whatever had it before the modal opened
      const prev = previousFocusRef.current;
      if (prev && typeof prev.focus === 'function') {
        prev.focus();
      }
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-brand-muted hover:bg-slate-100 hover:text-brand-ink"
          aria-label="Close AI Assistant"
        >
          ✕
        </button>

        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-indigo-700 flex items-center justify-center text-3xl mb-4 shadow-lg">
            ✨
          </div>
          <h2 id="ai-modal-title" className="text-2xl font-bold text-brand-ink mb-2">
            AI Travel Assistant
          </h2>
          <p className="text-brand-muted mb-6">
            Get personalized China itineraries, translations, and local insights — anytime.
          </p>

          <div className="rounded-xl bg-brand-surface border border-slate-200 p-6 mb-6">
            <p className="text-sm text-brand-muted italic">
              🚧 AI Assistant Coming Soon
            </p>
            <p className="text-xs text-brand-muted mt-2">
              We&apos;re putting the finishing touches on your 24/7 travel companion.
              Want early access?{' '}
              <a href="mailto:hello@wanderchina.com" className="text-brand-primary hover:underline">
                Join the waitlist
              </a>
              .
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-brand-primary text-white py-3 font-medium hover:bg-indigo-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}