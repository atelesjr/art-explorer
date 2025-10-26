import { NavLink } from 'react-router-dom';
import HomeOffSVG from '@/assets/home_off.svg';
import HallwaySVG from '@/assets/hallway.svg';

interface NavigationProps {
	className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
	return (
		<nav
			className={`flex flex-col sm:flex-row gap-y-5 sm:gap-x-4 pt-1 ${className}`}
		>
			<NavLink to="/" className="nav-link">
				<img src={HomeOffSVG} alt="Home" className="nav-img" />
				<span className="nav-font">Home</span>
			</NavLink>

			<NavLink to="/collection" className="nav-link">
				<img src={HallwaySVG} alt="Collection" className="nav-img" />
				<span className="nav-font">Your Collection</span>
			</NavLink>
		</nav>
	);
}
