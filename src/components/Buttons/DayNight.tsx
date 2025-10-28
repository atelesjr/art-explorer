import { useState, useEffect } from 'react';
import sunIcon from '@/assets/sun.svg';
import moonIcon from '@/assets/moon_crescent.svg';

const DayNightButton = () => {
	const [isDark, setIsDark] = useState(() => {
		const saved = localStorage.getItem('theme');
		return saved === 'dark';
	});

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [isDark]);

	const toggleTheme = () => {
		setIsDark(!isDark);
	};

	return (
		<button
			onClick={toggleTheme}
			className="relative inline-flex h-6 w-[50px] items-center rounded-full transition-colors duration-300"
			style={{ backgroundColor: isDark ? '#8B0000' : '#f3a7a7' }}
			aria-label="Toggle dark mode"
		>
			{/* Sliding circle */}
			<span
				className="absolute h-5 w-5 rounded-full bg-red-950 transition-transform duration-300 flex items-center justify-center"
				style={{
					transform: isDark ? 'translateX(27px)' : 'translateX(3px)',
				}}
			>
				<img
					src={isDark ? moonIcon : sunIcon}
					alt={isDark ? 'Moon' : 'Sun'}
					className="h-3.5 w-3.5"
				/>
			</span>
		</button>
	);
};

export default DayNightButton;
