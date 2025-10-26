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
 * @param searchQuery - Artist or culture name to search for (should be lowercase)
 */
export const useMetMuseumArtworks = (searchQuery: string) => {
	// Determine if we're doing a user search or default search
	const isUserSearch = searchQuery.trim().length > 0;
	const searchTerm = isUserSearch ? searchQuery.trim() : 'painting';

	// First, fetch all object IDs
	const {
		data: searchResults,
		isLoading: isLoadingSearch,
		error: searchError,
	} = useQuery({
		queryKey: ['metMuseum', 'search', searchTerm, isUserSearch],
		queryFn: () =>
			isUserSearch
				? metMuseumApi.searchByArtistOrCulture(searchTerm)
				: metMuseumApi.searchArtworks(searchTerm),
		staleTime: 10 * 60 * 1000, // 10 minutes
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
		queryKey: ['metMuseum', 'artworks', searchTerm, isUserSearch],
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
		enabled: !!searchResults?.objectIDs,
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
		isDefaultSearch: !isUserSearch,
	};
};
