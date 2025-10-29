import { useCallback, useState } from 'react';

const SEARCH_QUERY_KEY = 'home-search-query';

/**
 * SRP: Hook manages only search query state and persistence.
 * Open/Closed: easy to extend with history, suggestions, etc.
 */
export function useSearchState() {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    try {
      return sessionStorage.getItem(SEARCH_QUERY_KEY) || '';
    } catch {
      return '';
    }
  });

  const [totalResults, setTotalResults] = useState<number>(0);

  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query);
    try {
      sessionStorage.setItem(SEARCH_QUERY_KEY, query);
    } catch {
      // ignore storage errors
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setTotalResults(0);
    try {
      sessionStorage.removeItem(SEARCH_QUERY_KEY);
    } catch {
      // ignore storage errors
    }
  }, []);

  const updateResults = useCallback((total: number) => {
    setTotalResults(total);
  }, []);

  return {
    searchQuery,
    totalResults,
    updateSearch,
    clearSearch,
    updateResults,
  };
}