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

	const displayItems = externalArtworks || apiArtworks;
	const loading = externalArtworks ? isLoading : isLoadingApi;

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

	if (loading && displayItems.length === 0) {
		return (
			<section className={`gallery-container ${className}`}>
				<div className="gallery-grid">
					{Array.from({ length: 15 }).map((_, i) => (
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

	if (externalArtworks) {
		return (
			<section className={`gallery-container ${className}`}>
				<GalleryCards displayItems={displayItems} />
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
