import { useQuery } from '@tanstack/react-query';
import { metMuseumApi } from '@/services/metMuseumApi';
import { transformToArtworkItem } from '@/utils/transformers';
import type { ArtworkItem } from '@/types/metMuseum';

/**
 * SRP: Hook handles only favorites data fetching logic.
 * Easy to test, reuse, or swap API implementation.
 */
export function useFavoritesArtworks(favoriteIds: number[]) {
  return useQuery({
    queryKey: ['favorites', favoriteIds],
    queryFn: async (): Promise<ArtworkItem[]> => {
      if (favoriteIds.length === 0) return [];

      const results = await Promise.allSettled(
        favoriteIds.map((id) => metMuseumApi.getObjectDetails(id))
      );

      return results
        .filter(
          (r): r is PromiseFulfilledResult<
            Awaited<ReturnType<typeof metMuseumApi.getObjectDetails>>
          > => r.status === 'fulfilled'
        )
        .map((r) => transformToArtworkItem(r.value));
    },
    enabled: favoriteIds.length > 0,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}