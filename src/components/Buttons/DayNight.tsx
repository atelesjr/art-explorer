import sunIcon from '@/assets/sun.svg';
import moonIcon from '@/assets/moon_crescent.svg';
import { useDayNightTheme } from '@/hooks/useDayNightTheme';

const DayNightButton = () => {
	const { isDark, toggleTheme } = useDayNightTheme();

	const togglePosition = isDark ? 'translate-x-[27px]' : 'translate-x-[3px]';
	const toggleColor = isDark ? 'bg-met-red-darker' : 'bg-met-red-lighter';

	return (
		<button
			type="button"
			role="switch"
			aria-checked={isDark}
			aria-label="Toggle dark mode"
			title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			onClick={toggleTheme}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					toggleTheme();
				}
			}}
			className={`toggle-day-night ${toggleColor}`}
		>
			<span className={`toggle-btn ${togglePosition}`}>
				<img
					src={isDark ? moonIcon : sunIcon}
					alt=""
					aria-hidden="true"
					className="toggle-img"
				/>
			</span>
		</button>
	);
};

export default DayNightButton;
