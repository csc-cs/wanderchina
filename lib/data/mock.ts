import type { HotPostsApiResponse, HotSpotsApiResponse } from '@/types/homepage';

// In-memory mock for /api/homepage/* endpoints (replaces Spring Boot backend during dev).
// To switch to real backend, set NEXT_PUBLIC_API_BASE_URL env var.

const POSTS = [
  { post_id: 1, title: 'A first-timer\'s guide to navigating the Beijing subway', cover_url: 'https://picsum.photos/seed/post1/800/600', author: { user_id: 1, nickname: 'Sarah K.', avatar_url: '' }, city_code: 'beijing', city_name_en: 'Beijing', upvote_count: 1240, comment_count: 87, created_at: new Date(Date.now() - 2 * 3600_000).toISOString() },
  { post_id: 2, title: 'Hidden night markets in Chengdu that locals actually love', cover_url: 'https://picsum.photos/seed/post2/800/600', author: { user_id: 2, nickname: 'Mike L.', avatar_url: '' }, city_code: 'chengdu', city_name_en: 'Chengdu', upvote_count: 980, comment_count: 64, created_at: new Date(Date.now() - 5 * 3600_000).toISOString() },
  { post_id: 3, title: 'How I spent 48 perfect hours in Hangzhou on $50/day', cover_url: 'https://picsum.photos/seed/post3/800/600', author: { user_id: 3, nickname: 'Emma T.', avatar_url: '' }, city_code: 'hangzhou', city_name_en: 'Hangzhou', upvote_count: 2100, comment_count: 132, created_at: new Date(Date.now() - 24 * 3600_000).toISOString() },
  { post_id: 4, title: 'The Great Wall sections ranked — which one is worth your time?', cover_url: 'https://picsum.photos/seed/post4/800/600', author: { user_id: 4, nickname: 'David R.', avatar_url: '' }, city_code: 'beijing', city_name_en: 'Beijing', upvote_count: 3100, comment_count: 245, created_at: new Date(Date.now() - 36 * 3600_000).toISOString() },
  { post_id: 5, title: 'Xi\'an street food: 12 dishes you cannot miss', cover_url: 'https://picsum.photos/seed/post5/800/600', author: { user_id: 5, nickname: 'Lila C.', avatar_url: '' }, city_code: 'xian', city_name_en: "Xi'an", upvote_count: 1870, comment_count: 156, created_at: new Date(Date.now() - 48 * 3600_000).toISOString() },
  { post_id: 6, title: 'Lijiang old town: a slow travel guide', cover_url: 'https://picsum.photos/seed/post6/800/600', author: { user_id: 6, nickname: 'Tom H.', avatar_url: '' }, city_code: 'lijiang', city_name_en: 'Lijiang', upvote_count: 1450, comment_count: 92, created_at: new Date(Date.now() - 72 * 3600_000).toISOString() },
  { post_id: 7, title: 'Shanghai\'s French Concession: cafes, lanes, and history', cover_url: 'https://picsum.photos/seed/post7/800/600', author: { user_id: 7, nickname: 'Olivia P.', avatar_url: '' }, city_code: 'shanghai', city_name_en: 'Shanghai', upvote_count: 2680, comment_count: 178, created_at: new Date(Date.now() - 96 * 3600_000).toISOString() },
  { post_id: 8, title: 'Sanya vs Hainan: where to actually go for beaches', cover_url: 'https://picsum.photos/seed/post8/800/600', author: { user_id: 8, nickname: 'James N.', avatar_url: '' }, city_code: 'sanya', city_name_en: 'Sanya', upvote_count: 1190, comment_count: 73, created_at: new Date(Date.now() - 120 * 3600_000).toISOString() },
  { post_id: 9, title: 'Solo female travel in Guilin: safety tips and hidden gems', cover_url: 'https://picsum.photos/seed/post9/800/600', author: { user_id: 9, nickname: 'Rita M.', avatar_url: '' }, city_code: 'guilin', city_name_en: 'Guilin', upvote_count: 1670, comment_count: 112, created_at: new Date(Date.now() - 144 * 3600_000).toISOString() },
  { post_id: 10, title: 'Why I chose a Chengdu teahouse over the panda base', cover_url: 'https://picsum.photos/seed/post10/800/600', author: { user_id: 10, nickname: 'Carlos V.', avatar_url: '' }, city_code: 'chengdu', city_name_en: 'Chengdu', upvote_count: 950, comment_count: 58, created_at: new Date(Date.now() - 168 * 3600_000).toISOString() },
];

const SPOTS = [
  { spot_id: 1, name_en: 'Forbidden City', cover_url: 'https://picsum.photos/seed/spot1/600/800', city_code: 'beijing', city_name_en: 'Beijing', view_count: 24500, recommended_duration: 'Half day', ticket_price: '¥60', category: 'history' as const, rating: 4.8, review_count: 12400, price_cny: 60, loved_by_count: 12400, loved_by_country: 'USA', english_guide: true },
  { spot_id: 2, name_en: 'Yu Garden & Bazaar', cover_url: 'https://picsum.photos/seed/spot2/600/800', city_code: 'shanghai', city_name_en: 'Shanghai', view_count: 18900, recommended_duration: '2-3 hours', ticket_price: '¥40', category: 'history' as const, rating: 4.6, review_count: 8900, price_cny: 40, loved_by_count: 8900, loved_by_country: 'UK', english_guide: true },
  { spot_id: 3, name_en: 'Terracotta Army', cover_url: 'https://picsum.photos/seed/spot3/600/800', city_code: 'xian', city_name_en: "Xi'an", view_count: 31200, recommended_duration: 'Half day', ticket_price: '¥120', category: 'history' as const, rating: 4.9, review_count: 15600, price_cny: 120, loved_by_count: 15600, loved_by_country: 'Germany', english_guide: true },
  { spot_id: 4, name_en: 'Chengdu Panda Base', cover_url: 'https://picsum.photos/seed/spot4/600/800', city_code: 'chengdu', city_name_en: 'Chengdu', view_count: 42000, recommended_duration: 'Half day', ticket_price: '¥55', category: 'nature' as const, rating: 4.7, review_count: 22300, price_cny: 55, loved_by_count: 22300, loved_by_country: 'USA', english_guide: true },
  { spot_id: 5, name_en: 'West Lake', cover_url: 'https://picsum.photos/seed/spot5/600/800', city_code: 'hangzhou', city_name_en: 'Hangzhou', view_count: 27800, recommended_duration: 'Full day', ticket_price: 'Free', category: 'nature' as const, rating: 4.8, review_count: 13700, price_cny: 0, loved_by_count: 13700, loved_by_country: 'Japan', english_guide: true },
  { spot_id: 6, name_en: 'Li River Cruise', cover_url: 'https://picsum.photos/seed/spot6/600/800', city_code: 'guilin', city_name_en: 'Guilin', view_count: 19800, recommended_duration: 'Full day', ticket_price: '¥450', category: 'nature' as const, rating: 4.9, review_count: 9800, price_cny: 450, loved_by_count: 9800, loved_by_country: 'Australia', english_guide: true },
  { spot_id: 7, name_en: 'Lijiang Old Town', cover_url: 'https://picsum.photos/seed/spot7/600/800', city_code: 'lijiang', city_name_en: 'Lijiang', view_count: 15600, recommended_duration: 'Full day', ticket_price: '¥80', category: 'history' as const, rating: 4.7, review_count: 7600, price_cny: 80, loved_by_count: 7600, loved_by_country: 'France', english_guide: true },
  { spot_id: 8, name_en: 'Yalong Bay', cover_url: 'https://picsum.photos/seed/spot8/600/800', city_code: 'sanya', city_name_en: 'Sanya', view_count: 22300, recommended_duration: 'Full day', ticket_price: 'Free', category: 'nature' as const, rating: 4.6, review_count: 11200, price_cny: 0, loved_by_count: 11200, loved_by_country: 'Russia', english_guide: false },
  { spot_id: 9, name_en: 'Wangfujing Snack Street', cover_url: 'https://picsum.photos/seed/spot9/600/800', city_code: 'beijing', city_name_en: 'Beijing', view_count: 13400, recommended_duration: '2-3 hours', ticket_price: 'Free', category: 'food' as const, rating: 4.5, review_count: 6700, price_cny: 0, loved_by_count: 6700, loved_by_country: 'Korea', english_guide: true },
  { spot_id: 10, name_en: 'Jinli Ancient Street', cover_url: 'https://picsum.photos/seed/spot10/600/800', city_code: 'chengdu', city_name_en: 'Chengdu', view_count: 11200, recommended_duration: '2-3 hours', ticket_price: 'Free', category: 'food' as const, rating: 4.6, review_count: 5800, price_cny: 0, loved_by_count: 5800, loved_by_country: 'Thailand', english_guide: true },
  { spot_id: 11, name_en: 'Bund Night View', cover_url: 'https://picsum.photos/seed/spot11/600/800', city_code: 'shanghai', city_name_en: 'Shanghai', view_count: 38700, recommended_duration: '2-3 hours', ticket_price: 'Free', category: 'nightlife' as const, rating: 4.8, review_count: 19200, price_cny: 0, loved_by_count: 19200, loved_by_country: 'USA', english_guide: true },
  { spot_id: 12, name_en: 'Muslim Quarter Night Market', cover_url: 'https://picsum.photos/seed/spot12/600/800', city_code: 'xian', city_name_en: "Xi'an", view_count: 16900, recommended_duration: '2-3 hours', ticket_price: 'Free', category: 'nightlife' as const, rating: 4.7, review_count: 8400, price_cny: 0, loved_by_count: 8400, loved_by_country: 'Spain', english_guide: false },
];

export function getHotPostsMock(): HotPostsApiResponse {
  return {
    code: 0,
    message: 'success',
    data: { items: POSTS, generated_at: new Date().toISOString() },
  };
}

export function getHotSpotsMock(): HotSpotsApiResponse {
  return {
    code: 0,
    message: 'success',
    data: { items: SPOTS, generated_at: new Date().toISOString() },
  };
}

// Simulate network delay (200ms)
export async function delay<T>(value: T, ms = 200): Promise<T> {
  await new Promise((r) => setTimeout(r, ms));
  return value;
}