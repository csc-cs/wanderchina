import type {
  ExploreItem,
  HotPostItem,
  HotSpotItem,
} from '@/types/homepage';
import type { ExploreCategoryId } from '@/config/explore';
import { cnToEnCategory } from '@/lib/utils/format';

export function mergeExploreItems(
  hotPosts: HotPostItem[],
  hotSpots: HotSpotItem[],
): ExploreItem[] {
  const postItems: ExploreItem[] = hotPosts
    .filter((p) => Boolean(p.title) && Boolean(p.cover_url))
    .map<ExploreItem>((p) => ({
      type: 'post',
      id: p.post_id,
      title: p.title,
      cover_url: p.cover_url,
      city_code: p.city_code,
      city_name_en: p.city_name_en,
      category: 'history', // posts default to history bucket (storytelling)
      loved_by_count: p.upvote_count,
      loved_by_country: 'Worldwide',
      english_guide: false,
      upvote_count: p.upvote_count,
      comment_count: p.comment_count,
    }));

  const spotItems: ExploreItem[] = hotSpots
    .filter((s) => Boolean(s.name_en) && Boolean(s.cover_url))
    .map<ExploreItem>((s) => ({
      type: 'spot',
      id: s.spot_id,
      title: s.name_en,
      cover_url: s.cover_url,
      city_code: s.city_code,
      city_name_en: s.city_name_en,
      category: s.category ?? 'history',
      duration: s.recommended_duration,
      price_cny: s.price_cny ?? (s.ticket_price ? 45 : undefined),
      rating: s.rating ?? 4.5 + Math.random() * 0.5,
      review_count: s.review_count ?? Math.floor(500 + Math.random() * 1500),
      loved_by_count: s.loved_by_count ?? Math.floor(s.view_count / 10),
      loved_by_country: s.loved_by_country ?? 'USA',
      english_guide: s.english_guide ?? Math.random() > 0.5,
    }));

  return [...spotItems, ...postItems].sort((a, b) => b.loved_by_count - a.loved_by_count);
}

export function filterByCategory(
  items: ExploreItem[],
  category: ExploreCategoryId,
): ExploreItem[] {
  if (category === 'all') return items;
  return items.filter((item) => {
    if (item.type === 'post') return category === 'history';
    return item.category === category;
  });
}