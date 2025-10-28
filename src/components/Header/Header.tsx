import { useState } from 'react';
import { Logo } from './Logo';
import ButtonHamburger from '@/components/Buttons/Hamburger';
import { Navigation } from './Navigation';
import { MenuDrawer } from './MenuDrawer';
import DayNightButton from '../Buttons/DayNight';

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="header">
			<Logo />

			<div className="hidden sm:flex items-center gap-4">
				<Navigation />
				<DayNightButton />
			</div>

			<div className="flex sm:hidden relative">
				<ButtonHamburger isOpen={isMenuOpen} onToggle={toggleMenu} />
				<MenuDrawer open={isMenuOpen} onToggle={toggleMenu} />
			</div>
		</header>
	);
}
