const GalleryCardSkeleton = () => (
	<article className="gallery-card animate-pulse">
		<div className="gallery-image-wrapper bg-gray-200 dark:bg-gray-700" />
		<div className="gallery-content space-y-3 dark:bg-black">
			<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
			<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
			<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
		</div>
	</article>
);

export default GalleryCardSkeleton;
