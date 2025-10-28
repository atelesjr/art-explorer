import type { ArtworkItem } from '@/types/metMuseum';

export interface GalleryProps {
  isLoading?: boolean;
  className?: string;
  searchQuery?: string;
  onResultsChange?: (count: number) => void;
  externalArtworks?: ArtworkItem[];
}
