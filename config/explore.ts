// Explore section category configuration (culturally translated for overseas users)
export type ExploreCategoryId = 'all' | 'food' | 'nature' | 'history' | 'nightlife';

export interface ExploreCategoryConfig {
  id: ExploreCategoryId;
  label: string;          // English label (culturally translated)
  icon: string;           // emoji icon (simple, no icon library dependency)
  accentColor: string;    // hex
  accentBg: string;       // tailwind class
}

export const EXPLORE_CATEGORIES: ExploreCategoryConfig[] = [
  { id: 'all',       label: 'All',                 icon: '✨', accentColor: '#4F46E5', accentBg: 'bg-indigo-50' },
  { id: 'food',      label: 'Food & Cuisine',      icon: '🍜', accentColor: '#F59E0B', accentBg: 'bg-amber-50' },
  { id: 'nature',    label: 'Nature & Hiking',     icon: '🏔️', accentColor: '#10B981', accentBg: 'bg-emerald-50' },
  { id: 'history',   label: 'History & Culture',   icon: '🏛️', accentColor: '#8B5CF6', accentBg: 'bg-violet-50' },
  { id: 'nightlife', label: 'Nightlife & Markets', icon: '🌃', accentColor: '#EC4899', accentBg: 'bg-pink-50' },
];

export const EXPLORE_SECTION = {
  TITLE: 'Explore China',
  SUBTITLE: 'Curated by locals · Updated weekly',
  BROWSE_ALL_HREF: '/guides',
  EMPTY_MESSAGE: 'No spots match your filters yet — try a different category.',
  CLEAR_FILTERS_LABEL: 'Clear Filters',
  PARTIAL_DEGRADE_TOAST: 'Some content is temporarily unavailable',
};

export const CNY_TO_USD_RATE = 7.25; // Mock rate; in real app fetch from FX API