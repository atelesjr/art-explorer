import type { GalleryProps } from './types';
import GalleryCardSkeleton from './GalleryCardSkeleton';
import GalleryCard from './GalleryCard';
import InfiniteScrolling from '../InfiniteScrolling';
import { useMetMuseumArtworks } from '@/hooks/useMetMuseumArtworks';

const Gallery = ({
	items = [],
	isLoading = false,
	className = '',
	searchQuery = 'painting', // New prop for search
}: GalleryProps) => {
	const {
		artworks,
		isLoading: isLoadingApi,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		error,
	} = useMetMuseumArtworks(searchQuery);

	// Use API data if available, otherwise fallback to props
	const displayItems = artworks.length > 0 ? artworks : items;
	const loading = isLoading || isLoadingApi;

	if (loading && displayItems.length === 0) {
		return (
			<section className={`gallery-container ${className}`}>
				<div className="gallery-grid">
					{Array.from({ length: 15 }).map((_, index) => (
						<GalleryCardSkeleton key={index} />
					))}
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className={`gallery-container ${className}`}>
				<div className="text-center py-12">
					<p className="text-red-500 text-lg">
						Failed to load artworks. Please try again later.
					</p>
				</div>
			</section>
		);
	}

	if (displayItems.length === 0) {
		return (
			<section className={`gallery-container ${className}`}>
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No artworks found</p>
				</div>
			</section>
		);
	}

	return (
		<section className={`gallery-container ${className}`}>
			<InfiniteScrolling
				pageSize={15}
				isLoading={isFetchingNextPage}
				hasMore={hasNextPage}
				onLoadMore={async () => {
					if (hasNextPage && !isFetchingNextPage) {
						await fetchNextPage();
					}
				}}
			>
				<GalleryCard displayItems={displayItems} />
			</InfiniteScrolling>
		</section>
	);
};

export default Gallery;
