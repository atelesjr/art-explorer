import { useEffect } from 'react';
import type { GalleryProps } from './types';
import GalleryCardSkeleton from './GalleryCardSkeleton';
import GalleryCards from './GalleryCards';
import InfiniteScrolling from '../InfiniteScrolling';
import { useMetMuseumArtworks } from '@/hooks/useMetMuseumArtworks';

const Gallery = ({
	isLoading = false,
	className = '',
	searchQuery = '',
	onResultsChange,
}: GalleryProps) => {
	const {
		artworks,
		isLoading: isLoadingApi,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		error,
		totalResults,
		isDefaultSearch,
	} = useMetMuseumArtworks(searchQuery);

	// Notify parent component of results count only when searching (not default)
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

	// Always use API data
	const displayItems = artworks;
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
				<GalleryCards displayItems={displayItems} />
			</InfiniteScrolling>
		</section>
	);
};

export default Gallery;
