import Search from '@/assets/search.svg';
import Close from '@/assets/close.svg';

interface SearchButtonProps {
	hasQuery: boolean;
	handleReset: () => void;
}

const SearchButton = ({ hasQuery, handleReset }: SearchButtonProps) => {
	// ...existing code...
	return (
		<>
			{hasQuery ? (
				<button
					type="button"
					onClick={handleReset}
					className="search-bar-button"
					aria-label="Clear search"
					title="Clear search"
				>
					<img src={Close} alt="" className="search-icon" aria-hidden="true" />
				</button>
			) : (
				<button type="submit" className="search-bar-button" aria-label="Search">
					<img src={Search} alt="" className="search-icon" aria-hidden="true" />
				</button>
			)}
		</>
	);
};

export default SearchButton;
