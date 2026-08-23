// City color palette (overseas-user friendly, not red/gold)
export type CityColor = {
  bg: string;
  text: string;
  accent: string;
};

export const CITY_COLOR_MAP: Record<string, CityColor> = {
  beijing:    { bg: 'bg-rose-100',    text: 'text-rose-700',    accent: '#BE123C' },
  shanghai:   { bg: 'bg-indigo-100',  text: 'text-indigo-700',  accent: '#4F46E5' },
  xian:       { bg: 'bg-amber-100',   text: 'text-amber-700',   accent: '#B45309' },
  chengdu:    { bg: 'bg-emerald-100', text: 'text-emerald-700', accent: '#047857' },
  hangzhou:   { bg: 'bg-teal-100',    text: 'text-teal-700',    accent: '#0F766E' },
  guilin:     { bg: 'bg-sky-100',     text: 'text-sky-700',     accent: '#0369A1' },
  lijiang:    { bg: 'bg-violet-100',  text: 'text-violet-700',  accent: '#6D28D9' },
  sanya:      { bg: 'bg-orange-100',  text: 'text-orange-700',  accent: '#C2410C' },
};

// Default fallback for unknown city_code
export const FALLBACK_CITY_COLOR: CityColor = {
  bg: 'bg-slate-100',
  text: 'text-slate-700',
  accent: '#475569',
};

export function getCityColor(cityCode: string): CityColor {
  return CITY_COLOR_MAP[cityCode.toLowerCase()] ?? FALLBACK_CITY_COLOR;
}