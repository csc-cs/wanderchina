import Link from 'next/link';
import Image from 'next/image';
import { CITIES } from '@/config/cities';
import { getCityColor } from '@/config/city';

export function CityQuickEntry() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20" aria-label="City quick entry">
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

      {/* Mobile: horizontal scroll / Tablet & Desktop: 4-col grid */}
      <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-2">
        {CITIES.map((city) => {
          const color = getCityColor(city.code);
          return (
            <Link
              key={city.code}
              href={`/city/${city.code}`}
              className="group relative flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-auto aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 snap-start"
              aria-label={`Explore ${city.name_en}`}
            >
              <Image
                src={city.cover_url}
                alt={city.name_en}
                fill
                sizes="(max-width: 768px) 70vw, (max-width: 1024px) 45vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${color.bg} ${color.text} backdrop-blur-sm`}>
                  {city.name_zh}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">{city.name_en}</h3>
                <p className="text-xs text-white/80">{city.tagline}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}