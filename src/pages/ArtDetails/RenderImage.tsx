import type { MetMuseumObjectDetails } from '@/types/metMuseum';
import { useRenderImage } from './useRenderImage';

const RenderImage = ({
	artwork,
	isLoading,
}: {
	artwork: MetMuseumObjectDetails;
	isLoading: boolean;
}) => {
	const {
		smallSrc,
		largeSrc,
		largeLoaded,
		setLargeLoaded,
		smallLoaded,
		setSmallLoaded,
	} = useRenderImage({ artwork });

	if (isLoading) {
		return (
			<div className="render-image-loading">
				<p>Loading...</p>
			</div>
		);
	}

	const isLargeLoadedSmall = largeLoaded ? 'opacity-0' : 'opacity-100';
	const isLargeLoadedLarge = largeLoaded ? 'opacity-100' : 'opacity-0';

	return (
		<div className="flex items-center justify-center order-1">
			<div className="render-image-wrapper" aria-busy={!largeLoaded}>
				{/* Loading overlay (spinner + pulse) */}
				{!(smallLoaded || largeLoaded) && (
					<div className="render-image-overlay">
						<span aria-hidden="true" />
						<div className="render-image-overlay-large" />
						<div className="render-image-overlay-small" />
					</div>
				)}

				{/* Placeholder/small image */}
				{smallSrc && (
					<img
						src={smallSrc}
						alt={artwork.title || 'Artwork'}
						width={770}
						height={470}
						className={` render-image-small ${isLargeLoadedSmall}`}
						loading="eager"
						decoding="async"
						fetchPriority="high"
						onLoad={() => setSmallLoaded(true)}
					/>
				)}

				{/* Full image */}
				{largeSrc && (
					<img
						src={largeSrc}
						alt={artwork.title || 'Artwork'}
						width={770}
						height={470}
						className={` render-image-large ${isLargeLoadedLarge}`}
						onLoad={() => setLargeLoaded(true)}
						loading="eager"
						decoding="async"
						fetchPriority="high"
					/>
				)}

				{!smallSrc && !largeSrc && (
					<div className="render-image-error">No image available</div>
				)}
			</div>
		</div>
	);
};

export default RenderImage;
