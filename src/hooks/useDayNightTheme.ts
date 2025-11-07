import { useEffect, useState } from 'react';

export const useDayNightTheme = () => {
	const [isDark, setIsDark] = useState<boolean>(() => {
		try {
			const saved = localStorage.getItem('theme');
			if (saved === 'dark') return true;
			if (saved === 'light') return false;
			return (
				window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
			);
		} catch {
			return false;
		}
	});

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle('dark', isDark);
		try {
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		} catch {
			/* ignore storage errors */
		}
	}, [isDark]);

	const toggleTheme = () => setIsDark((v) => !v);

	return {
		isDark,
		toggleTheme,
	};
};
