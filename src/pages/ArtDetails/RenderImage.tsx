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
			<div className="container mx-auto p-4">
				<p className="text-center">Loading...</p>
			</div>
		);
	}

	const renderImageSize = (
		smallSrc: string | undefined,
		largeSrc: string | undefined
	) => {
		const classSmall = `absolute inset-0 w-full h-full object-contain transition-opacity duration-200 blur-sm scale-105 ${
			largeLoaded ? 'opacity-0' : 'opacity-100'
		}`;
		const classLarge = `absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
			largeLoaded ? 'opacity-100' : 'opacity-0'
		}`;

		const imageSrc = smallSrc ? smallSrc : largeSrc;
		const className = smallSrc ? classSmall : classLarge;
		const onLoad = smallSrc
			? () => setSmallLoaded(true)
			: () => setLargeLoaded(true);

		if (!smallSrc && !largeSrc) {
			<div className="absolute inset-0 flex items-center justify-center text-gray-400">
				No image available
			</div>;
		}

		return (
			<img
				src={imageSrc}
				alt={artwork.title || 'Artwork'}
				width={770}
				height={470}
				className={className}
				onLoad={onLoad}
				loading="eager"
				decoding="async"
				fetchPriority="high"
			/>
		);
	};

	return (
		<div className="flex items-center justify-center">
			<div
				className="relative w-full max-w-[770px] h-[470px] bg-gray-100 rounded-lg overflow-hidden"
				aria-busy={!largeLoaded} // accessibility hint
			>
				{/* Loading overlay (spinner + pulse) */}
				{!(smallLoaded || largeLoaded) && (
					<div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 transition-opacity duration-200">
						<span
							aria-hidden
							className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-gray-600 animate-spin"
						/>
						<div className="w-3/4 h-3 rounded bg-gray-200 animate-pulse" />
						<div className="w-1/2 h-3 rounded bg-gray-200 animate-pulse" />
					</div>
				)}

				{renderImageSize(smallSrc, largeSrc)}
			</div>
		</div>
	);
};

export default RenderImage;
