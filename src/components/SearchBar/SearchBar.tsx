import { useState, type FormEvent } from 'react';
import Search from '@/assets/search.svg';

interface SearchBarProps {
	placeholder?: string;
	onSearch?: (query: string) => void;
	className?: string;
}

const SearchBar = ({
	placeholder = 'Search artist / culture',
	onSearch,
	className = '',
}: SearchBarProps) => {
	const [query, setQuery] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (onSearch && query.trim()) {
			onSearch(query.trim());
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
			<button type="submit" className="search-bar-button " aria-label="Search">
				<img src={Search} alt="Search" className="search-icon " />
			</button>
		</form>
	);
};

export default SearchBar;
