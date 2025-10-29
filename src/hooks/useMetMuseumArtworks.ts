import { useInfiniteQuery } from '@tanstack/react-query';
import { metMuseumApi } from '@/services/metMuseumApi';
import { transformToArtworkItem } from '@/utils/transformers';

const PAGE_SIZE = 15;
const DEFAULT_SEARCH = 'painting';

export const useMetMuseumArtworks = (
	searchQuery: string = '',
	enabled: boolean = true
) => {
	const actualSearchQuery = searchQuery.trim() || DEFAULT_SEARCH;
	const isDefaultSearch = !searchQuery.trim();

	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['metMuseum', 'search', actualSearchQuery],
		queryFn: async ({ pageParam = 0 }) => {
			let objectIDs: number[] = [];

			if (isDefaultSearch) {
				const general = await metMuseumApi.searchArtworks(actualSearchQuery);
				objectIDs = general.objectIDs ?? [];
			} else {
				const byArtist = await metMuseumApi.searchByArtistOrCulture(
					actualSearchQuery
				);
				objectIDs = byArtist.objectIDs ?? [];
				if (objectIDs.length === 0) {
					const general = await metMuseumApi.searchArtworks(actualSearchQuery);
					objectIDs = general.objectIDs ?? [];
				}
			}

			if (!objectIDs || objectIDs.length === 0) {
				return { artworks: [], nextPage: undefined, total: 0 };
			}

			const start = pageParam as number;
			const end = Math.min(start + PAGE_SIZE, objectIDs.length);
			const pageObjectIDs = objectIDs.slice(start, end);

			const results = await Promise.allSettled(
				pageObjectIDs.map((id) => metMuseumApi.getObjectDetails(id))
			);

			const artworks = results
				.filter(
					(
						r
					): r is PromiseFulfilledResult<
						Awaited<ReturnType<typeof metMuseumApi.getObjectDetails>>
					> => r.status === 'fulfilled'
				)
				.map((r) => transformToArtworkItem(r.value))
				.filter((a) => a.imageUrl); // segurança

			return {
				artworks,
				nextPage: end < objectIDs.length ? end : undefined,
				total: objectIDs.length,
			};
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		initialPageParam: 0,
		staleTime: 5 * 60 * 1000,
		enabled,
	});

	const artworks = data?.pages.flatMap((p) => p.artworks) ?? [];
	const totalResults = data?.pages[0]?.total ?? 0;

	return {
		artworks,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage: !!hasNextPage,
		isFetchingNextPage,
		totalResults,
		isDefaultSearch,
	};
};
