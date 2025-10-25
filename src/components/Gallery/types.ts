export interface ArtworkItem {
	id: number;
	title: string;
	artist: string;
	date: string;
	imageUrl: string;
}

export interface GalleryProps {
	items?: ArtworkItem[];
	isLoading?: boolean;
	className?: string;
	searchQuery?: string;
}
