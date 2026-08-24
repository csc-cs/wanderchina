'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatPrice, formatLovedByCount } from '@/lib/utils/format';
import { getCityColor } from '@/config/city';
import { EXPLORE_CATEGORIES } from '@/config/explore';
import type { ExploreItem } from '@/types/homepage';

export interface ExploreCardProps {
  item: ExploreItem;
  onPreview?: () => void;
}

export function ExploreCard({ item, onPreview }: ExploreCardProps) {
  const [imgError, setImgError] = useState(false);
  const color = getCityColor(item.city_code);
  const price = formatPrice(item.price_cny);
  const categoryConfig = EXPLORE_CATEGORIES.find((c) => c.id === item.category);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onPreview) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPreview();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Preview on desktop hover intent? Spec says Quick View button opens drawer.
    // We let the button handle the preview; whole card navigates on click.
    if ((e.target as HTMLElement).closest('[data-preview-trigger]')) {
      e.preventDefault();
      onPreview?.();
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Explore ${item.title} in ${item.city_name_en}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 cursor-pointer min-h-[44px]"
    >
      {/* Cover image */}
      <div className="absolute inset-0">
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-4xl text-slate-400">
            🖼
          </div>
        ) : (
          <Image
            src={item.cover_url}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      </div>

      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${color.bg} ${color.text} backdrop-blur-sm`}>
          {item.city_name_en}
        </span>
        {item.english_guide && (
          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/95 text-white backdrop-blur-sm">
            🇬🇧 EN
          </span>
        )}
      </div>

      {/* Quick View button (desktop hover only) */}
      {onPreview && (
        <button
          type="button"
          data-preview-trigger
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          aria-label={`Quick view ${item.title}`}
          className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-brand-ink shadow-lg opacity-0 group-hover:opacity-100 motion-reduce:opacity-100 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          <span aria-hidden="true">👁</span>
          <span>Quick View</span>
        </button>
      )}

      {/* Trust Stack (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center gap-1.5 text-xs text-white/90 mb-1.5">
          <span aria-hidden="true">{categoryConfig?.icon ?? '✨'}</span>
          <span className="font-medium uppercase tracking-wide">
            {categoryConfig?.label.split(' & ')[0] ?? 'Explore'}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-2">{item.title}</h3>

        <div className="flex items-center gap-2 text-xs text-white/90 mb-1.5">
          {item.rating != null && item.review_count != null && (
            <span className="flex items-center gap-1">
              <span className="text-brand-accent">★</span>
              <span className="font-semibold">{item.rating.toFixed(1)}</span>
              <span className="text-white/70">({formatLovedByCount(item.review_count).replace('+', '')})</span>
            </span>
          )}
          {item.duration && (
            <>
              <span className="text-white/50">·</span>
              <span>{item.duration}</span>
            </>
          )}
        </div>

        {price && (
          <div className="text-sm font-semibold mb-1.5">
            {price.cny}
            {price.cny !== 'Free' && <span className="text-white/70 font-normal"> · {price.usd}</span>}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs text-white/80">
          <span aria-hidden="true">❤️</span>
          <span>
            Loved by <strong className="text-white">{formatLovedByCount(item.loved_by_count)}</strong>
            {item.loved_by_country && <span> from {item.loved_by_country}</span>}
          </span>
        </div>
      </div>
    </div>
  );
}