import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-brand-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-lg font-bold mb-2">
              <span className="text-brand-primary">Wander</span>China
            </div>
            <p className="text-sm text-brand-muted leading-relaxed">
              Discover China like a local. Real stories, English guides, and an AI travel companion.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-brand-ink">Explore</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link href="/guides" className="hover:text-brand-primary">Travel Guides</Link></li>
              <li><Link href="/community" className="hover:text-brand-primary">Community</Link></li>
              <li><Link href="/ai" className="hover:text-brand-primary">AI Planner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-brand-ink">Cities</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link href="/city/beijing" className="hover:text-brand-primary">Beijing</Link></li>
              <li><Link href="/city/shanghai" className="hover:text-brand-primary">Shanghai</Link></li>
              <li><Link href="/city/xian" className="hover:text-brand-primary">Xi&apos;an</Link></li>
              <li><Link href="/city/chengdu" className="hover:text-brand-primary">Chengdu</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-brand-ink">Company</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link href="/about" className="hover:text-brand-primary">About</Link></li>
              <li><Link href="/contact" className="hover:text-brand-primary">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-primary">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 text-xs text-brand-muted text-center">
          © {new Date().getFullYear()} WanderChina. Made for travelers who love China.
        </div>
      </div>
    </footer>
  );
}