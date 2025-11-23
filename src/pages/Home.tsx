import { useCallback } from 'react';
import Gallery from '@/components/Gallery/Gallery';
import SearchBar from '@/components/SearchBar/SearchBar';
import ResultsCounter from '@/components/SearchBar/ResultsCounter';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { useSearchState } from '@/hooks/useSearchState';

const Home = () => {
	const { clearScrollPosition } = useScrollRestoration();
	const {
		searchQuery,
		totalResults,
		updateSearch,
		clearSearch,
		updateResults,
	} = useSearchState();

	const handleSearch = useCallback(
		(query: string) => {
			updateSearch(query);
			clearScrollPosition();
			window.scrollTo(0, 0);
		},
		[updateSearch, clearScrollPosition]
	);

	const handleReset = useCallback(() => {
		clearSearch();
		clearScrollPosition();
		window.scrollTo(0, 0);
	}, [clearSearch, clearScrollPosition]);

	return (
		<section className="container-page">
			<h1>Search The Collection</h1>
			<SearchBar
				onSearch={handleSearch}
				onReset={handleReset}
				initialQuery={searchQuery}
			/>
			<ResultsCounter count={totalResults} query={searchQuery} />
			<Gallery searchQuery={searchQuery} onResultsChange={updateResults} />
		</section>
	);
};

export default Home;
