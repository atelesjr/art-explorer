import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { metMuseumApi } from '@/services/metMuseumApi';
import type { ArtworkItem } from '@/types/metMuseum';

const PAGE_SIZE = 15;

/**
 * Transform Met Museum API response to our ArtworkItem format
 */
const transformToArtworkItem = (
	details: Awaited<ReturnType<typeof metMuseumApi.getObjectDetails>>
): ArtworkItem => ({
	id: details.objectID,
	title: details.title || 'Untitled',
	artist: details.artistDisplayName || 'Unknown Artist',
	date: details.objectEndDate || 'Unknown Date',
	imageUrl: details.primaryImageSmall || details.primaryImage || '',
});

/**
 * Hook to fetch and paginate Met Museum artworks
 * Uses infinite query for seamless pagination
 */
export const useMetMuseumArtworks = (searchQuery: string) => {
	// First, fetch all object IDs
	const {
		data: searchResults,
		isLoading: isLoadingSearch,
		error: searchError,
	} = useQuery({
		queryKey: ['metMuseum', 'search', 'painting'],
		queryFn: () => metMuseumApi.searchArtworks('painting'),
		staleTime: 10 * 60 * 1000, // 10 minutes - search results don't change often
	});

	// Then, use infinite query to paginate through the object IDs
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isLoadingArtworks,
		error: artworksError,
	} = useInfiniteQuery({
		queryKey: ['metMuseum', 'artworks', 'painting'],
		queryFn: async ({ pageParam = 0 }) => {
			if (!searchResults?.objectIDs) {
				return { items: [], nextCursor: undefined };
			}

			const startIndex = pageParam * PAGE_SIZE;
			const endIndex = startIndex + PAGE_SIZE;
			const pageObjectIds = searchResults.objectIDs.slice(startIndex, endIndex);

			if (pageObjectIds.length === 0) {
				return { items: [], nextCursor: undefined };
			}

			// Batch fetch details for this page
			const details = await metMuseumApi.batchGetObjectDetails(pageObjectIds);
			const items = details
				.map(transformToArtworkItem)
				.filter((item) => item.imageUrl); // Only items with images

			const hasMore = endIndex < searchResults.objectIDs.length;
			const nextCursor = hasMore ? pageParam + 1 : undefined;

			return { items, nextCursor };
		},
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: !!searchResults?.objectIDs, // Only run when we have search results
		initialPageParam: 0,
	});

	// Flatten all pages into a single array
	const artworks: ArtworkItem[] =
		data?.pages.flatMap((page) => page.items) ?? [];

	return {
		artworks,
		isLoading: isLoadingSearch || isLoadingArtworks,
		isFetchingNextPage,
		hasNextPage: hasNextPage ?? false,
		fetchNextPage,
		error: searchError || artworksError,
		totalResults: searchResults?.total ?? 0,
	};
};
