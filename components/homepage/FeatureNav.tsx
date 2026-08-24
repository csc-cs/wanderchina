import Link from 'next/link';
import { FEATURE_NAV_ITEMS } from '@/config/homepage';

export function FeatureNav() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      aria-label="Feature navigation"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-2">
          Your China trip, three ways
        </h2>
        <p className="text-brand-muted max-w-xl mx-auto">
          Pick the style that matches your travel mood — every entry point leads somewhere useful.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 grid-rows-fr">
        {FEATURE_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative overflow-hidden rounded-2xl ${item.accent} p-6 sm:p-8 border border-transparent hover:border-brand-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 min-h-[44px]`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-sm mb-4 text-4xl motion-reduce:transition-none">
              {item.icon}
            </div>
            <h3 className={`text-lg sm:text-xl font-bold mb-2 ${item.accentText}`}>
              {item.title}
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed line-clamp-2">
              {item.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 transition-transform duration-200">
              <span>Enter</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}