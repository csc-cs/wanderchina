'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { ExploreItem } from '@/types/homepage';
import { formatPrice, formatLovedByCount } from '@/lib/utils/format';
import { getCityColor } from '@/config/city';
import { EXPLORE_CATEGORIES } from '@/config/explore';

export interface ExploreCardProps {
  item: ExploreItem;
}

export function ExploreCard({ item }: ExploreCardProps) {
  const [imgError, setImgError] = useState(false);
  const color = getCityColor(item.city_code);
  const price = formatPrice(item.price_cny);
  const categoryConfig = EXPLORE_CATEGORIES.find((c) => c.id === item.category);
  const href = item.type === 'spot'
    ? `/guides/spot/${item.id}`
    : `/community/post/${item.id}`;

  return (
    <Link
      href={href}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white"
      aria-label={`Explore ${item.title} in ${item.city_name_en}`}
    >
      {/* Cover image */}
      <div className="absolute inset-0">
        {!imgError ? (
          <Image
            src={item.cover_url}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-4xl text-slate-400">
            🖼
          </div>
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
      <div className="hidden lg:block absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-brand-ink shadow-lg">
          <span aria-hidden="true">👁</span>
          <span>Quick View</span>
        </span>
      </div>

      {/* Trust Stack (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center gap-1.5 text-xs text-white/90 mb-1.5">
          <span aria-hidden="true">{categoryConfig?.icon ?? '✨'}</span>
          <span className="font-medium uppercase tracking-wide">
            {categoryConfig?.label.split(' & ')[0] ?? 'Explore'}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-2">{item.title}</h3>

        {/* Rating + duration + price */}
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

        {/* Social proof */}
        <div className="flex items-center gap-1.5 text-xs text-white/80">
          <span aria-hidden="true">❤️</span>
          <span>
            Loved by <strong className="text-white">{formatLovedByCount(item.loved_by_count)}</strong>
            {item.loved_by_country && <span> from {item.loved_by_country}</span>}
          </span>
        </div>
      </div>
    </Link>
  );
}