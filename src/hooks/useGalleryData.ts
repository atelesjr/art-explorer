import { useMemo } from 'react';
import { useMetMuseumArtworks } from './useMetMuseumArtworks';
import type { ArtworkItem } from '@/types/metMuseum';

interface UseGalleryDataProps {
	searchQuery: string;
	externalArtworks?: ArtworkItem[];
	isExternalLoading?: boolean;
}

/**
 * SRP: Hook manages only Gallery data fetching and derived state.
 * Separates data logic from UI rendering.
 */
export function useGalleryData({
	searchQuery,
	externalArtworks,
	isExternalLoading = false,
}: UseGalleryDataProps) {
	const isExternal = !!externalArtworks;

	const {
		artworks: apiArtworks,
		isLoading: isLoadingApi,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		error,
		totalResults,
		isDefaultSearch,
	} = useMetMuseumArtworks(searchQuery, !isExternal);

	const displayItems = useMemo(
		() => externalArtworks || apiArtworks,
		[externalArtworks, apiArtworks]
	);

	const loading = useMemo(
		() => (isExternal ? isExternalLoading : isLoadingApi),
		[isExternal, isExternalLoading, isLoadingApi]
	);

	return {
		displayItems,
		loading,
		error: isExternal ? null : error,
		isFetchingNextPage,
		hasNextPage: isExternal ? false : hasNextPage,
		fetchNextPage,
		totalResults,
		isDefaultSearch,
		isExternal,
	};
}
