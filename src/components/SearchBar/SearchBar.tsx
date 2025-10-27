import { useState, type FormEvent, useEffect } from 'react';
import Search from '@/assets/search.svg';
import Close from '@/assets/close.svg';

interface SearchBarProps {
	placeholder?: string;
	onSearch?: (query: string) => void;
	onReset?: () => void;
	className?: string;
	initialQuery?: string; // NEW
}

const SearchBar = ({
	placeholder = 'Search artist / culture',
	onSearch,
	onReset,
	className = '',
	initialQuery = '', // NEW
}: SearchBarProps) => {
	const [query, setQuery] = useState(initialQuery);
	const [isSearchActive, setIsSearchActive] = useState(!!initialQuery); // NEW: Set based on initial value

	// NEW: Sync with parent changes
	useEffect(() => {
		setQuery(initialQuery);
		setIsSearchActive(!!initialQuery);
	}, [initialQuery]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const trimmedQuery = query.trim().toLowerCase();
		if (onSearch && trimmedQuery) {
			onSearch(trimmedQuery);
			setIsSearchActive(true);
		}
	};

	const handleReset = () => {
		setQuery('');
		setIsSearchActive(false);
		if (onReset) {
			onReset();
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={`search-bar-container ${className}`}
		>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder={placeholder}
				className="search-bar-input"
			/>
			{isSearchActive ? (
				<button
					type="button"
					onClick={handleReset}
					className="search-bar-button"
					aria-label="Reset Search"
				>
					<img src={Close} alt="Close" className="search-icon" />
				</button>
			) : (
				<button type="submit" className="search-bar-button" aria-label="Search">
					<img src={Search} alt="Search" className="search-icon" />
				</button>
			)}
		</form>
	);
};

export default SearchBar;
