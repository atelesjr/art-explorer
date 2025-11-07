import { useCallback, useEffect } from 'react';

interface UseGalleryCallbacksProps {
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => Promise<unknown>;
	onResultsChange?: (count: number) => void;
	totalResults: number;
	searchQuery: string;
	isLoading: boolean;
	isDefaultSearch: boolean;
}

/**
 * SRP: Hook manages only Gallery callbacks.
 * Keeps handlers stable to prevent child re-renders.
 */
export function useGalleryCallbacks({
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	onResultsChange,
	totalResults,
	searchQuery,
	isLoading,
	isDefaultSearch,
}: UseGalleryCallbacksProps) {
	const loadMore = useCallback(async () => {
		if (hasNextPage && !isFetchingNextPage) {
			await fetchNextPage();
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	useEffect(() => {
		if (onResultsChange && searchQuery && !isLoading && !isDefaultSearch) {
			onResultsChange(totalResults);
		}
	}, [totalResults, isLoading, onResultsChange, searchQuery, isDefaultSearch]);

	return { loadMore };
}
