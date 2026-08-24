'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { keepPreviousData } from '@tanstack/react-query';
import { useHotPosts } from '@/hooks/useHotPosts';
import { useHotSpots } from '@/hooks/useHotSpots';
import { mergeExploreItems, filterByCategory } from '@/lib/data/explore';
import { EXPLORE_CATEGORIES, EXPLORE_SECTION } from '@/config/explore';
import type { ExploreCategoryId } from '@/config/explore';
import { ExploreCard } from './ExploreCard';
import { ExplorePreviewDrawer } from './ExplorePreviewDrawer';
import type { ExploreItem } from '@/types/homepage';

const TOAST_AUTO_HIDE_MS = 3000;

export function Explore() {
  const [active, setActive] = useState<ExploreCategoryId>('all');
  const [previewItem, setPreviewItem] = useState<ExploreItem | null>(null);
  const [showDegradeToast, setShowDegradeToast] = useState(false);

  const postsQ = useHotPosts(10, 7, { placeholderData: keepPreviousData });
  const spotsQ = useHotSpots(12, { placeholderData: keepPreviousData });

  const items = useMemo(() => {
    if (!postsQ.data || !spotsQ.data) return [];
    return mergeExploreItems(postsQ.data, spotsQ.data);
  }, [postsQ.data, spotsQ.data]);

  const filtered = useMemo(() => filterByCategory(items, active), [items, active]);

  const isLoading = postsQ.isLoading || spotsQ.isLoading;
  const hasError = postsQ.isError && spotsQ.isError;
  const partialDegrade = (postsQ.isError || spotsQ.isError) && !hasError;

  // Single warn when one of two data sources fails (per spec — not per render loop)
  useEffect(() => {
    if (partialDegrade) {
      console.warn('[Explore] partial degrade: one of posts/spots sources failed');
    }
  }, [partialDegrade]);

  // Auto-hide partial-degrade toast after 3s (per spec)
  useEffect(() => {
    if (!partialDegrade) return;
    setShowDegradeToast(true);
    const t = setTimeout(() => setShowDegradeToast(false), TOAST_AUTO_HIDE_MS);
    return () => clearTimeout(t);
  }, [partialDegrade]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" aria-label="Explore China">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-2">
            {EXPLORE_SECTION.TITLE}
          </h2>
          <p className="text-brand-muted">
            {EXPLORE_SECTION.SUBTITLE}
          </p>
        </div>
        <Link
          href={EXPLORE_SECTION.BROWSE_ALL_HREF}
          className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-brand-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          <span>Browse All</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label="Filter by category"
        className="flex gap-2 mb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-1"
      >
        {EXPLORE_CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat.id)}
              className={`flex-shrink-0 snap-start inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[44px] ${
                isActive
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white text-brand-ink border border-slate-200 hover:border-brand-primary hover:text-brand-primary'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2`}
            >
              <span aria-hidden="true">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Partial degrade toast — auto-hides after 3s */}
      {showDegradeToast && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800 animate-fade-in motion-reduce:animate-none"
        >
          ⚠ {EXPLORE_SECTION.PARTIAL_DEGRADE_TOAST}
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <SkeletonGrid />
      ) : hasError ? (
        <ErrorState />
      ) : filtered.length === 0 ? (
        <EmptyState onClear={() => setActive('all')} />
      ) : (
        <div
          role="tabpanel"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filtered.slice(0, 12).map((item) => (
            <ExploreCard
              key={`${item.type}-${item.id}`}
              item={item}
              onPreview={() => setPreviewItem(item)}
            />
          ))}
        </div>
      )}

      <ExplorePreviewDrawer item={previewItem} onClose={() => setPreviewItem(null)} />
    </section>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div key={i} className="aspect-[3/4] bg-slate-100 animate-pulse motion-reduce:animate-none rounded-2xl" />
      ))}
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-brand-surface p-12 text-center">
      <div className="text-5xl mb-3">🔍</div>
      <h3 className="text-lg font-semibold text-brand-ink mb-2">
        {EXPLORE_SECTION.EMPTY_MESSAGE}
      </h3>
      <button
        type="button"
        onClick={onClear}
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
      >
        {EXPLORE_SECTION.CLEAR_FILTERS_LABEL}
      </button>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-brand-surface p-10 text-center">
      <div className="text-4xl mb-3">😕</div>
      <h3 className="text-lg font-semibold text-brand-ink mb-2">
        Couldn&apos;t load content
      </h3>
      <p className="text-sm text-brand-muted">
        Please refresh the page or check your connection.
      </p>
    </div>
  );
}