import { useCallback, useEffect, useMemo } from 'react';
import type { GalleryProps } from '@/types/gallery';
import GalleryCardSkeleton from './GalleryCardSkeleton';
import GalleryCards from './GalleryCards';
import InfiniteScrolling from '@/components/InfiniteScrolling/InfiniteScrolling';
import { useMetMuseumArtworks } from '@/hooks/useMetMuseumArtworks';

const PAGE_SIZE = 15;

const Gallery = ({
	isLoading = false,
	className = '',
	searchQuery = '',
	onResultsChange,
	externalArtworks,
}: GalleryProps) => {
	const {
		artworks: apiArtworks,
		isLoading: isLoadingApi,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		error,
		totalResults,
		isDefaultSearch,
	} = useMetMuseumArtworks(searchQuery, !externalArtworks);

	// Derived data is memoized to keep referential stability for children
	const displayItems = useMemo(
		() => externalArtworks || apiArtworks,
		[externalArtworks, apiArtworks]
	);

	const loading = useMemo(
		() => (externalArtworks ? isLoading : isLoadingApi),
		[externalArtworks, isLoading, isLoadingApi]
	);

	// Stable handler (DIP: UI doesn’t know the fetching details)
	const loadMore = useCallback(async () => {
		if (hasNextPage && !isFetchingNextPage) {
			await fetchNextPage();
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	// Notify parent when search results change (SRP: side-effect isolated)
	useEffect(() => {
		if (onResultsChange && searchQuery && !isLoadingApi && !isDefaultSearch) {
			onResultsChange(totalResults);
		}
	}, [
		totalResults,
		isLoadingApi,
		onResultsChange,
		searchQuery,
		isDefaultSearch,
	]);

	// UI states
	if (loading && displayItems.length === 0) {
		return (
			<section className={`gallery-container ${className}`}>
				<div className="gallery-grid">
					{Array.from({ length: PAGE_SIZE }).map((_, i) => (
						<GalleryCardSkeleton key={i} />
					))}
				</div>
			</section>
		);
	}

	if (error && !externalArtworks) {
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

	if (!loading && displayItems.length === 0) {
		return (
			<section className={`gallery-container ${className}`}>
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No artworks found</p>
				</div>
			</section>
		);
	}

	const cards = <GalleryCards displayItems={displayItems} />;

	// Favorites (external data): no infinite scroll
	if (externalArtworks) {
		return (
			<section className={`gallery-container ${className}`}>{cards}</section>
		);
	}

	// Home (API + infinite scroll)
	return (
		<section className={`gallery-container ${className}`}>
			<InfiniteScrolling
				pageSize={PAGE_SIZE}
				isLoading={isFetchingNextPage}
				hasMore={hasNextPage}
				onLoadMore={loadMore}
			>
				{cards}
			</InfiniteScrolling>
		</section>
	);
};

export default Gallery;
