import type { MetMuseumObjectDetails } from '@/types/metMuseum';
import { useEffect, useMemo, useState } from 'react';

interface useRenderImageProps {
	artwork: MetMuseumObjectDetails;
}

export const useRenderImage = ({ artwork }: useRenderImageProps) => {
	const smallSrc = artwork?.primaryImageSmall || artwork?.primaryImage || '';
	const largeSrc = artwork?.primaryImage || artwork?.primaryImageSmall || '';

	const [largeLoaded, setLargeLoaded] = useState(false);
	const [smallLoaded, setSmallLoaded] = useState(false); // NEW: track placeholder load

	// Preconnect to the image origin to speed up TLS/DNS
	const imageOrigin = useMemo(() => {
		if (!artwork) return undefined; // Ensure artwork is defined before accessing its properties
		try {
			return largeSrc ? new URL(largeSrc).origin : undefined;
		} catch {
			return undefined;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [largeSrc]);

	useEffect(() => {
		if (!imageOrigin) return;
		const link = document.createElement('link');
		link.rel = 'preconnect';
		link.href = imageOrigin;
		link.crossOrigin = 'anonymous';
		document.head.appendChild(link);
		return () => {
			document.head.removeChild(link);
		};
	}, [imageOrigin]);

	return {
		smallSrc,
		largeSrc,
		largeLoaded,
		setLargeLoaded,
		smallLoaded,
		setSmallLoaded,
	};
};
