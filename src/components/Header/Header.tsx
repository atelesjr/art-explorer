import Logo from './Logo';
import { Navigation } from './Navigation';
import { MenuDrawer } from './MenuDrawer';
import DayNightButton from '../Buttons/DayNight';
import { useToggle } from '@/hooks/useToggle';
import ButtonHamburger from '@/components/Buttons/Hamburger';

const Header = () => {
	const { value: isMenuOpen, toggle: toggleMenu } = useToggle(false);

	return (
		<header className="header">
			<Logo />

			<div className="header-navigation">
				<Navigation />
				<DayNightButton />
			</div>

			<div className="header-navigation-mobile">
				<ButtonHamburger isOpen={isMenuOpen} onToggle={toggleMenu} />
				<MenuDrawer open={isMenuOpen} onToggle={toggleMenu} />
			</div>
		</header>
	);
};

export default Header;
