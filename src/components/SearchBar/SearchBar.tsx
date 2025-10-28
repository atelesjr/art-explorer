import { memo } from 'react';
import SearchButton from './SearchButton';
import { useSearch } from './useSearch';

interface SearchBarProps {
	placeholder?: string;
	onSearch?: (query: string) => void;
	onReset?: () => void;
	className?: string;
	initialQuery?: string;
}

const SearchBar = ({
	placeholder = 'Search artist / culture',
	onSearch,
	onReset,
	className = '',
	initialQuery = '',
}: SearchBarProps) => {
	const { query, hasQuery, handleChange, handleSubmit, handleReset } =
		useSearch({
			initialQuery,
			onSearch,
			onReset,
		});

	return (
		<form
			role="search"
			onSubmit={handleSubmit}
			className={`search-bar-container ${className}`}
		>
			<input
				type="text"
				name="q"
				value={query}
				onChange={handleChange}
				onKeyDown={(e) => {
					if (e.key === 'Escape' && hasQuery) {
						e.preventDefault();
						handleReset();
					}
				}}
				placeholder={placeholder}
				className="search-bar-input"
				aria-label="Search artworks by artist or culture"
				autoComplete="off"
				spellCheck={false}
				inputMode="search"
			/>
			<SearchButton hasQuery={hasQuery} handleReset={handleReset} />
		</form>
	);
};

export default memo(SearchBar);
