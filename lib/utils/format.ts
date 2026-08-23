import { CNY_TO_USD_RATE } from '@/config/explore';

export function formatViewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 10_000)    return `${(count / 1_000).toFixed(1)}k`;
  if (count >= 1_000)     return `${(count / 1_000).toFixed(1)}k`;
  return count.toString();
}

export function formatPrice(cny: number | undefined): { cny: string; usd: string } | null {
  if (cny == null) return null;
  const usd = cny / CNY_TO_USD_RATE;
  return {
    cny: cny === 0 ? 'Free' : `¥${cny}`,
    usd: cny === 0 ? 'Free' : `$${usd < 1 ? '<1' : Math.round(usd)}`,
  };
}

export function formatLovedByCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M+`;
  if (count >= 1_000)     return `${(count / 1_000).toFixed(1)}k+`;
  return `${count}+`;
}

export function cnToEnCategory(cn: string): 'food' | 'nature' | 'history' | 'nightlife' | undefined {
  const map: Record<string, 'food' | 'nature' | 'history' | 'nightlife'> = {
    '美食': 'food',
    '餐饮': 'food',
    '自然': 'nature',
    '户外': 'nature',
    '历史': 'history',
    '文化': 'history',
    '夜市': 'nightlife',
    '夜生活': 'nightlife',
  };
  return map[cn];
}