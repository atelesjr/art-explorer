import Gallery from '@/components/Gallery/Gallery';
import SearchBar from '@/components/SearchBar/SearchBar';

const Home = () => {
	const handleSearch = (query: string) => {
		console.log('Searching for:', query);
		// Aqui você fará a chamada à API
	};

	return (
		<section className="container-page">
			<h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
				Search The Collection
			</h1>
			<SearchBar onSearch={handleSearch} />
			<Gallery />
		</section>
	);
};

export default Home;
