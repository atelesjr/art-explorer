import { useState } from 'react';
import { Logo } from './Logo';
import { HamburgerMenu } from './HamburgerMenu';
import { Navigation } from './Navigation';
import { MenuDrawer } from './MenuDrawer';

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="header">
			<Logo />

			<div className="hidden sm:flex">
				<Navigation />
			</div>

			<div className="flex sm:hidden relative">
				<HamburgerMenu isOpen={isMenuOpen} onToggle={toggleMenu} />
				<MenuDrawer open={isMenuOpen} onToggle={toggleMenu} />
			</div>
		</header>
	);
}
