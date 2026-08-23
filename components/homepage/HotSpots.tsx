'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useHotSpots } from '@/hooks/useHotSpots';
import { formatViewCount } from '@/lib/utils/format';
import { getCityColor } from '@/config/city';

export function HotSpots() {
  const { data: spots = [], isLoading, isError, refetch } = useHotSpots(8);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-[3/4] bg-slate-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader />
        <div className="rounded-2xl border border-slate-200 bg-brand-surface p-8 text-center">
          <p className="text-brand-muted mb-4">Couldn&apos;t load popular attractions.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full bg-brand-primary text-white px-5 py-2 text-sm font-medium hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" aria-label="Popular attractions">
      <SectionHeader />

      {/* Desktop & tablet: 4×2 grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {spots.map((spot) => {
          const color = getCityColor(spot.city_code);
          return (
            <Link
              key={spot.spot_id}
              href={`/guides/spot/${spot.spot_id}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <Image
                src={spot.cover_url}
                alt={spot.name_en}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${color.bg} ${color.text} backdrop-blur-sm`}>
                  {spot.city_name_en}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-base sm:text-lg font-bold mb-1 line-clamp-1">{spot.name_en}</h3>
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span className="flex items-center gap-1">
                    <span aria-hidden="true">👀</span>
                    <span>{formatViewCount(spot.view_count)} views</span>
                  </span>
                  {spot.recommended_duration && (
                    <span className="text-white/70">{spot.recommended_duration}</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
        {spots.map((spot) => {
          const color = getCityColor(spot.city_code);
          return (
            <Link
              key={spot.spot_id}
              href={`/guides/spot/${spot.spot_id}`}
              className="group relative flex-shrink-0 w-[70vw] aspect-[3/4] overflow-hidden rounded-2xl shadow-md snap-start"
            >
              <Image
                src={spot.cover_url}
                alt={spot.name_en}
                fill
                sizes="70vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${color.bg} ${color.text}`}>
                  {spot.city_name_en}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="text-sm font-bold line-clamp-1">{spot.name_en}</h3>
                <span className="text-xs text-white/70">👀 {formatViewCount(spot.view_count)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-2">
          Popular attractions
        </h2>
        <p className="text-brand-muted">
          What travelers are loving right now — ranked by views.
        </p>
      </div>
      <Link
        href="/guides"
        className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:gap-2 transition-all"
      >
        <span>View all</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}