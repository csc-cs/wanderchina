// ===== HotPosts types (from /api/homepage/hot-posts) =====
export interface HotPostAuthor {
  user_id: number;
  nickname: string;
  avatar_url: string;
}

export interface HotPostItem {
  post_id: number;
  title: string;
  cover_url: string;
  author: HotPostAuthor;
  city_code: string;
  city_name_en: string;
  upvote_count: number;
  comment_count: number;
  created_at: string; // ISO 8601
}

export interface HotPostsData {
  items: HotPostItem[];
  generated_at: string;
}

export interface HotPostsApiResponse {
  code: number;
  message: string;
  data: HotPostsData | null;
}

// ===== HotSpots types (from /api/homepage/hot-spots) =====
export interface HotSpotItem {
  spot_id: number;
  name_en: string;
  name_zh?: string;
  cover_url: string;
  city_code: string;
  city_name_en: string;
  view_count: number;
  recommended_duration?: string;
  ticket_price?: string;
  category?: 'food' | 'nature' | 'history' | 'nightlife';
  rating?: number;
  review_count?: number;
  price_cny?: number;
  loved_by_count?: number;
  loved_by_country?: string;
  english_guide?: boolean;
}

export interface HotSpotsData {
  items: HotSpotItem[];
  generated_at: string;
}

export interface HotSpotsApiResponse {
  code: number;
  message: string;
  data: HotSpotsData | null;
}

// ===== Explore types (client-side aggregation) =====
export interface ExploreItemBase {
  id: number;
  title: string;
  cover_url: string;
  city_code: string;
  city_name_en: string;
  category: 'food' | 'nature' | 'history' | 'nightlife';
  duration?: string;
  price_cny?: number;
  rating?: number;
  review_count?: number;
  loved_by_count: number;
  loved_by_country?: string;
  english_guide: boolean;
}

export interface ExploreSpotItem extends ExploreItemBase {
  type: 'spot';
}

export interface ExplorePostItem extends ExploreItemBase {
  type: 'post';
  upvote_count: number;
  comment_count: number;
}

export type ExploreItem = ExploreSpotItem | ExplorePostItem;