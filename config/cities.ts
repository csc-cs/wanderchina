import { CITY_COLOR_MAP } from './city';

export interface CityConfig {
  code: string;
  name_en: string;
  name_zh: string;
  tagline: string;
  cover_url: string;
}

// MVP 8 cities (matches spec homepage-city-quick-entry)
export const CITIES: CityConfig[] = [
  {
    code: 'beijing',
    name_en: 'Beijing',
    name_zh: '北京',
    tagline: 'Capital of dynasties',
    cover_url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80',
  },
  {
    code: 'shanghai',
    name_en: 'Shanghai',
    name_zh: '上海',
    tagline: 'East-meets-West',
    cover_url: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80',
  },
  {
    code: 'xian',
    name_en: "Xi'an",
    name_zh: '西安',
    tagline: 'Ancient Silk Road',
    cover_url: 'https://images.unsplash.com/photo-1599321955726-f87171ba6b06?w=800&q=80',
  },
  {
    code: 'chengdu',
    name_en: 'Chengdu',
    name_zh: '成都',
    tagline: 'Home of pandas',
    cover_url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
  },
  {
    code: 'hangzhou',
    name_en: 'Hangzhou',
    name_zh: '杭州',
    tagline: 'West Lake serenity',
    cover_url: 'https://images.unsplash.com/photo-1518544866330-95a2bec01ef7?w=800&q=80',
  },
  {
    code: 'guilin',
    name_en: 'Guilin',
    name_zh: '桂林',
    tagline: 'Karst mountains',
    cover_url: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800&q=80',
  },
  {
    code: 'lijiang',
    name_en: 'Lijiang',
    name_zh: '丽江',
    tagline: 'Old town vibes',
    cover_url: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
  },
  {
    code: 'sanya',
    name_en: 'Sanya',
    name_zh: '三亚',
    tagline: 'Tropical beach escape',
    cover_url: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?w=800&q=80',
  },
];

export const CITY_CODE_SET = new Set(CITIES.map((c) => c.code));

export { CITY_COLOR_MAP };