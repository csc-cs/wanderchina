import type { HotPostsApiResponse, HotSpotsApiResponse } from '@/types/homepage';
import { delay, getHotPostsMock, getHotSpotsMock } from '@/lib/data/mock';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''; // empty → use mock

async function fetchJson<T>(url: string, fallback: () => T): Promise<T> {
  if (!API_BASE) return delay(fallback());
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[api] ${url} failed, using mock:`, err);
    return fallback();
  }
}

export async function getHotPosts(params: { limit?: number; days?: number } = {}): Promise<HotPostsApiResponse> {
  const { limit = 10, days = 7 } = params;
  return fetchJson(`${API_BASE}/api/homepage/hot-posts?limit=${limit}&days=${days}`, () => getHotPostsMock());
}

export async function getHotSpots(params: { limit?: number } = {}): Promise<HotSpotsApiResponse> {
  const { limit = 8 } = params;
  return fetchJson(`${API_BASE}/api/homepage/hot-spots?limit=${limit}`, () => getHotSpotsMock());
}