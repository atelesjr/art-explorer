import type { ArtworkItem } from '@/types/metMuseum';
import type { metMuseumApi } from '@/services/metMuseumApi';

/**
 * DRY: Single source of truth for API → ArtworkItem transformation
 */
export const transformToArtworkItem = (
  details: Awaited<ReturnType<typeof metMuseumApi.getObjectDetails>>
): ArtworkItem => ({
  id: details.objectID,
  title: details.title || 'Untitled',
  artist: details.artistDisplayName || 'Unknown Artist',
  date: details.objectEndDate || 'Unknown Date',
  imageUrl: details.primaryImageSmall || details.primaryImage || '',
});