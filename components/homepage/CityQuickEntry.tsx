'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CITIES } from '@/config/cities';
import { getCityColor } from '@/config/city';

export function CityQuickEntry() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      aria-label="City quick entry"
    >
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-2">
            Where will you go first?
          </h2>
          <p className="text-brand-muted">
            Eight cities loved by travelers from around the world.
          </p>
        </div>
        <Link
          href="/guides/cities"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:gap-2 transition-all"
        >
          <span>View all</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Mobile: horizontal scroll / Tablet: 2x4 / Desktop: 4x2 */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-2">
        {CITIES.map((city) => (
          <CityCard key={city.code} code={city.code} nameEn={city.name_en} nameZh={city.name_zh} tagline={city.tagline} coverUrl={city.cover_url} />
        ))}
      </div>
    </section>
  );
}

interface CityCardProps {
  code: string;
  nameEn: string;
  nameZh?: string;
  tagline: string;
  coverUrl: string;
}

function CityCard({ code, nameEn, nameZh, tagline, coverUrl }: CityCardProps) {
  const color = getCityColor(code);
  const [imgError, setImgError] = useState(false);

  // Warn once per missing name_zh (client-side defensive check)
  useEffect(() => {
    if (!nameZh) {
      console.warn(`[CityQuickEntry] Missing name_zh for city: ${code}`);
    }
  }, [nameZh, code]);

  return (
    <Link
      href={`/guides/${code}`}
      className="group relative flex-shrink-0 w-[40vw] sm:w-auto aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 snap-start min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      aria-label={`Explore ${nameEn}`}
    >
      {!imgError ? (
        <Image
          src={coverUrl}
          alt={nameEn}
          fill
          sizes="(max-width: 768px) 40vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500 motion-reduce:transition-none"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-4xl text-slate-400">
          🖼
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute top-3 left-3">
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${color.bg} ${color.text} backdrop-blur-sm`}
        >
          {nameZh ?? nameEn}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-bold mb-1">{nameEn}</h3>
        <p className="text-xs text-white/80">{tagline}</p>
      </div>
    </Link>
  );
}