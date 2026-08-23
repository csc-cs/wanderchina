'use client';
import { useQuery } from '@tanstack/react-query';
import { getHotPosts } from '@/lib/api/homepage';
import type { HotPostItem } from '@/types/homepage';

export function useHotPosts(limit = 10, days = 7) {
  return useQuery<HotPostItem[]>({
    queryKey: ['homepage', 'hot-posts', { limit, days }],
    queryFn: async () => {
      const res = await getHotPosts({ limit, days });
      return res.data?.items ?? [];
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
}