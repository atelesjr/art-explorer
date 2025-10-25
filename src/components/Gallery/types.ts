export interface GalleryProps {
	isLoading?: boolean;
	className?: string;
	searchQuery?: string;
	onResultsChange?: (total: number) => void; // New prop
}
