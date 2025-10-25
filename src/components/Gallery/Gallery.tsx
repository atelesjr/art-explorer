import type { GalleryProps } from './types';
import GalleryCardSkeleton from './GalleryCardSkeleton';
import GalleryCard from './GalleryCard';
import { mockItems } from './mockData';
import InfiniteScrolling from '../InfiniteScrolling';

const Gallery = ({
	items = [],
	isLoading = false,
	className = '',
}: GalleryProps) => {
	const displayItems = items.length > 0 ? items : mockItems;

	if (isLoading) {
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
			<InfiniteScrolling pageSize={15}>
				<GalleryCard displayItems={displayItems} />
			</InfiniteScrolling>
		</section>
	);
};

export default Gallery;
