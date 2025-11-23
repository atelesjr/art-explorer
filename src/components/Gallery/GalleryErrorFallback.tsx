interface GalleryErrorFallbackProps {
	error?: Error;
	resetError?: () => void;
}

const GalleryErrorFallback = ({
	error,
	resetError,
}: GalleryErrorFallbackProps) => {
	return (
		<div className="gallery-fallback">
			<h3 className="gallery-fallback-title">Failed to load gallery</h3>
			<p className="gallery-fallback-message">
				{error?.message || 'An error occurred while loading artworks'}
			</p>
			{resetError && (
				<button onClick={resetError} className="gallery-fallback-btn">
					Reload Gallery
				</button>
			)}
		</div>
	);
};

export default GalleryErrorFallback;
