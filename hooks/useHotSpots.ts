'use client';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getHotSpots } from '@/lib/api/homepage';
import type { HotSpotItem } from '@/types/homepage';

export function useHotSpots(
  limit = 8,
  options?: Omit<UseQueryOptions<HotSpotItem[]>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<HotSpotItem[]>({
    queryKey: ['homepage', 'hot-spots', { limit }],
    queryFn: async () => {
      const res = await getHotSpots({ limit });
      return res.data?.items ?? [];
    },
    staleTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
    ...options,
  });
}