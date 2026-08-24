'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCityColor } from '@/config/city';
import { EXPLORE_CATEGORIES } from '@/config/explore';
import { formatPrice, formatLovedByCount } from '@/lib/utils/format';
import type { ExploreItem } from '@/types/homepage';

export interface ExplorePreviewDrawerProps {
  item: ExploreItem | null;
  onClose: () => void;
}

export function ExplorePreviewDrawer({ item, onClose }: ExplorePreviewDrawerProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!item) return;
    previousFocusRef.current = (document.activeElement as HTMLElement) ?? null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      const prev = previousFocusRef.current;
      if (prev && typeof prev.focus === 'function') prev.focus();
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const color = getCityColor(item.city_code);
  const price = formatPrice(item.price_cny);
  const categoryConfig = EXPLORE_CATEGORIES.find((c) => c.id === item.category);
  const href = item.type === 'spot'
    ? `/guides/spot/${item.id}`
    : `/community/post/${item.id}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="explore-preview-title"
      className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in motion-reduce:animate-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto animate-slide-in-right motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
          <Image
            src={item.cover_url}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 28rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center text-brand-ink hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            ✕
          </button>
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${color.bg} ${color.text} backdrop-blur-sm`}>
              {item.city_name_en}
            </span>
          </div>
        </div>

        <div className="p-6">
          {categoryConfig && (
            <div className="flex items-center gap-1.5 text-xs text-brand-muted uppercase tracking-wide mb-3">
              <span aria-hidden="true">{categoryConfig.icon}</span>
              <span>{categoryConfig.label}</span>
            </div>
          )}
          <h3 id="explore-preview-title" className="text-2xl font-bold text-brand-ink mb-3">
            {item.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-sm text-brand-muted mb-4">
            {item.rating != null && item.review_count != null && (
              <span className="flex items-center gap-1">
                <span className="text-brand-accent">★</span>
                <strong className="text-brand-ink">{item.rating.toFixed(1)}</strong>
                <span>({formatLovedByCount(item.review_count).replace('+', '')})</span>
              </span>
            )}
            {item.duration && (
              <span className="flex items-center gap-1">
                <span aria-hidden="true">⏱</span>
                <span>{item.duration}</span>
              </span>
            )}
            {price && (
              <span className="flex items-center gap-1">
                <span aria-hidden="true">💰</span>
                <strong className="text-brand-ink">{price.cny}</strong>
                {price.cny !== 'Free' && <span className="text-brand-muted">· {price.usd}</span>}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-brand-muted mb-6 pb-6 border-b border-slate-200">
            <span aria-hidden="true">❤️</span>
            <span>
              Loved by <strong className="text-brand-ink">{formatLovedByCount(item.loved_by_count)}</strong>
              {item.loved_by_country && <span> from {item.loved_by_country}</span>}
            </span>
          </div>

          <Link
            href={href}
            className="block w-full text-center rounded-full bg-brand-primary text-white py-3 font-medium hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
}