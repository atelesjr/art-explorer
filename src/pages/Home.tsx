import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Gallery from '@/components/Gallery/Gallery';
import SearchBar from '@/components/SearchBar/SearchBar';

const SCROLL_POSITION_KEY = 'home-scroll-position';

const Home = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [totalResults, setTotalResults] = useState<number>(0);
	const location = useLocation();

	// Disable browser scroll restoration
	useLayoutEffect(() => {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}
		return () => {
			if ('scrollRestoration' in window.history) {
				window.history.scrollRestoration = 'auto';
			}
		};
	}, []);

	// Restore scroll position when coming back from details
	useEffect(() => {
		if (location.state?.fromDetails) {
			const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
			if (savedPosition) {
				const position = parseInt(savedPosition, 10);

				// Multiple attempts with increasing delays to ensure images are loaded
				const attempts = [0, 100, 300, 500, 800];
				attempts.forEach((delay) => {
					setTimeout(() => {
						window.scrollTo(0, position);
					}, delay);
				});

				// Cleanup
				return () => {
					sessionStorage.removeItem(SCROLL_POSITION_KEY);
				};
			}
		}
	}, [location]);

	// Save scroll position continuously
	useEffect(() => {
		const handleScroll = () => {
			sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleSearch = (query: string) => {
		console.log('Searching for:', query);
		setSearchQuery(query);
		sessionStorage.removeItem(SCROLL_POSITION_KEY);
		window.scrollTo(0, 0);
	};

	const handleReset = () => {
		console.log('Resetting search');
		setSearchQuery('');
		setTotalResults(0);
		sessionStorage.removeItem(SCROLL_POSITION_KEY);
		window.scrollTo(0, 0);
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
