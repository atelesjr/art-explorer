import { useCallback, useEffect, useState, type FormEvent } from 'react';

interface UseSearchProps {
	initialQuery?: string;
	onSearch?: (query: string) => void;
	onReset?: () => void;
}

export const useSearch = ({
	initialQuery = '',
	onSearch,
	onReset,
}: UseSearchProps) => {
	const [query, setQuery] = useState(initialQuery);

	// Keep in sync with parent
	useEffect(() => {
		setQuery(initialQuery);
	}, [initialQuery]);

	const hasQuery = query.trim().length > 0;

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	}, []);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			const trimmed = query.trim().toLowerCase();
			if (trimmed && onSearch) onSearch(trimmed);
		},
		[query, onSearch]
	);

	const handleReset = useCallback(() => {
		setQuery('');
		onReset?.();
	}, [onReset]);

	return {
		query,
		hasQuery,
		handleChange,
		handleSubmit,
		handleReset,
	};
};
