'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useHotPosts } from '@/hooks/useHotPosts';
import { formatRelativeTime } from '@/lib/utils/time';
import { getCityColor } from '@/config/city';

export function HotPosts() {
  const { data: posts = [], isLoading, isError, refetch } = useHotPosts(10, 7);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[16/10] bg-slate-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || posts.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader />
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-brand-surface p-8 text-center">
            <p className="text-brand-muted mb-4">Couldn&apos;t load trending posts.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-full bg-brand-primary text-white px-5 py-2 text-sm font-medium hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        )}
      </section>
    );
  }

  const [featured, ...rest] = posts;
  const featuredColor = getCityColor(featured.city_code);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" aria-label="Trending traveler stories">
      <SectionHeader />

      {/* Desktop: 1 large + small grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        {/* Featured (large, spans 2 cols) */}
        <Link
          href={`/community/post/${featured.post_id}`}
          className="group lg:col-span-2 lg:row-span-2 relative aspect-[16/10] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-shadow"
        >
          <Image
            src={featured.cover_url}
            alt={featured.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${featuredColor.bg} ${featuredColor.text} backdrop-blur-sm`}>
              {featured.city_name_en}
            </span>
            <span className="ml-2 inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-accent text-white">
              🔥 Top Trending
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-2">{featured.title}</h3>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span>by {featured.author.nickname}</span>
              <span>·</span>
              <span>{formatRelativeTime(featured.created_at)}</span>
              <span>·</span>
              <span>❤️ {featured.upvote_count.toLocaleString()}</span>
            </div>
          </div>
        </Link>

        {/* Smaller cards */}
        {rest.slice(0, 4).map((post) => {
          const color = getCityColor(post.city_code);
          return (
            <Link
              key={post.post_id}
              href={`/community/post/${post.post_id}`}
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-shadow"
            >
              <Image
                src={post.cover_url}
                alt={post.title}
                fill
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${color.bg} ${color.text}`}>
                  {post.city_name_en}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 className="text-sm font-semibold line-clamp-2 mb-1">{post.title}</h4>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <span>❤️ {post.upvote_count.toLocaleString()}</span>
                  <span>·</span>
                  <span>{formatRelativeTime(post.created_at)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile / Tablet: horizontal scroll */}
      <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
        {posts.map((post) => {
          const color = getCityColor(post.city_code);
          return (
            <Link
              key={post.post_id}
              href={`/community/post/${post.post_id}`}
              className="group relative flex-shrink-0 w-[80vw] sm:w-[40vw] aspect-[16/10] overflow-hidden rounded-2xl shadow-md snap-start"
            >
              <Image
                src={post.cover_url}
                alt={post.title}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${color.bg} ${color.text}`}>
                  {post.city_name_en}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 className="text-sm font-semibold line-clamp-2 mb-1">{post.title}</h4>
                <span className="text-xs text-white/70">❤️ {post.upvote_count.toLocaleString()}</span>
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
          Trending traveler stories
        </h2>
        <p className="text-brand-muted">
          What other travelers are talking about this week.
        </p>
      </div>
      <Link
        href="/community"
        className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:gap-2 transition-all"
      >
        <span>View all</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-brand-surface p-10 text-center">
      <div className="text-4xl mb-3">📝</div>
      <h3 className="text-lg font-semibold text-brand-ink mb-2">
        No trending posts this week.
      </h3>
      <p className="text-sm text-brand-muted mb-5">
        Be the first to share your China story.
      </p>
      <Link
        href="/community/new"
        className="inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700"
      >
        <span>Write a Post</span>
      </Link>
    </div>
  );
}