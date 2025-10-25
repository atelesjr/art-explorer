import { useState } from 'react';
import Gallery from '@/components/Gallery/Gallery';
import SearchBar from '@/components/SearchBar/SearchBar';

const Home = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [totalResults, setTotalResults] = useState<number>(0);

	const handleSearch = (query: string) => {
		console.log('Searching for:', query);
		setSearchQuery(query);
	};

	const handleReset = () => {
		console.log('Resetting search');
		setSearchQuery('');
		setTotalResults(0);
	};

	const handleResultsChange = (total: number) => {
		setTotalResults(total);
	};

	return (
		<section className="container-page">
			<h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
				Search The Collection
			</h1>
			<SearchBar onSearch={handleSearch} onReset={handleReset} />
			{searchQuery && totalResults > 0 && (
				<div className="mt-4 mb-6">
					<p className="text-gray-600 text-sm">
						Results: <span className="font-semibold">{totalResults}</span>{' '}
						images
					</p>
				</div>
			)}
			<Gallery
				searchQuery={searchQuery}
				onResultsChange={handleResultsChange}
			/>
		</section>
	);
};

export default Home;
