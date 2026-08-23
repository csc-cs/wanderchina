// Shell-level configuration constants
export const SHELL_CONFIG = {
  HEADER_SCROLL_THRESHOLD: 100,
  HEADER_HEIGHT_PX: 64,
  AI_MODAL_DEFAULT_OPEN: false,
  AI_FAB_LABEL: 'Ask AI',
};

export const HERO_CONFIG = {
  TITLE: 'Discover China',
  TITLE_HIGHLIGHT: 'Like a Local',
  SUBTITLE: 'Real traveler stories, English guides, and a 24/7 AI travel companion — all in one place.',
  HERO_IMAGE: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
};

export const FEATURE_NAV_ITEMS = [
  {
    title: 'Travel Guides',
    description: 'In-depth English guides curated by locals',
    icon: '📖',
    href: '/guides',
    accent: 'bg-indigo-50',
    accentText: 'text-indigo-600',
  },
  {
    title: 'AI Travel Planner',
    description: 'Chat with our AI for personalized itineraries',
    icon: '✨',
    href: '/ai',
    accent: 'bg-amber-50',
    accentText: 'text-amber-600',
  },
  {
    title: 'Traveler Stories',
    description: 'Real experiences from around the world',
    icon: '🌍',
    href: '/community',
    accent: 'bg-emerald-50',
    accentText: 'text-emerald-600',
  },
] as const;