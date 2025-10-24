import { useState } from 'react';
import { Logo } from './Logo';
import { HamburgerMenu } from './HamburgerMenu';
import { Navigation } from './Navigation';

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="header">
			<Logo />

			<HamburgerMenu isOpen={isMenuOpen} onToggle={toggleMenu} />

			<div className="hidden sm:flex">
				<Navigation />
			</div>
		</header>
	);
}
