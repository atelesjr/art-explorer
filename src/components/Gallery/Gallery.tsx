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

	const renderContent = () => {
		// Loading state
		if (loading && displayItems.length === 0) {
			return <GalleryStates type="loading" pageSize={PAGE_SIZE} />;
		}

		// Error state
		if (error) {
			return <GalleryStates type="error" />;
		}

		// Empty state
		if (!loading && displayItems.length === 0) {
			return <GalleryStates type="empty" />;
		}

		// Success state with data
		const cards = <GalleryCards displayItems={displayItems} />;

		return isExternal ? (
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
		);
	};

	return (
		<section className={`gallery-container ${className}`}>
			{renderContent()}
		</section>
	);
};

export default Gallery;
