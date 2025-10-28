import type { ArtworkItem } from './metMuseum';

export interface GalleryProps {
	isLoading?: boolean;
	className?: string;
	searchQuery?: string;
	onResultsChange?: (count: number) => void;
	externalArtworks?: ArtworkItem[];
}
