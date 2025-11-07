import type { GalleryProps } from '@/types/gallery';
import GalleryCards from './GalleryCards';
import GalleryStates from './GalleryStates';
import InfiniteScrolling from '@/components/InfiniteScrolling/InfiniteScrolling';
import { useGalleryData } from '@/hooks/useGalleryData';
import { useGalleryCallbacks } from '@/hooks/useGalleryCallbacks';

const PAGE_SIZE = 15;

const Gallery = ({
	isLoading = false,
	className = '',
	searchQuery = '',
	onResultsChange,
	externalArtworks,
}: GalleryProps) => {
	const {
		displayItems,
		loading,
		error,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		totalResults,
		isDefaultSearch,
		isExternal,
	} = useGalleryData({
		searchQuery,
		externalArtworks,
		isExternalLoading: isLoading,
	});

	const { loadMore } = useGalleryCallbacks({
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		onResultsChange,
		totalResults,
		searchQuery,
		isLoading: loading,
		isDefaultSearch,
	});

	// Render states
	if (loading && displayItems.length === 0) {
		return (
			<section className={`gallery-container ${className}`}>
				<GalleryStates type="loading" pageSize={PAGE_SIZE} />
			</section>
		);
	}

	if (error) {
		return (
			<section className={`gallery-container ${className}`}>
				<GalleryStates type="error" />
			</section>
		);
	}

	if (!loading && displayItems.length === 0) {
		return (
			<section className={`gallery-container ${className}`}>
				<GalleryStates type="empty" />
			</section>
		);
	}

	const cards = <GalleryCards displayItems={displayItems} />;

	return (
		<section className={`gallery-container ${className}`}>
			{isExternal ? (
				cards
			) : (
				<InfiniteScrolling
					pageSize={PAGE_SIZE}
					isLoading={isFetchingNextPage}
					hasMore={hasNextPage}
					onLoadMore={loadMore}
				>
					{cards}
				</InfiniteScrolling>
			)}
		</section>
	);
};

export default Gallery;
