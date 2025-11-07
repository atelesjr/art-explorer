import { NavLink } from 'react-router-dom';
import HomeSVG from '@/assets/home.svg';
import HeartSVG from '@/assets/heart.svg';

interface NavigationProps {
	className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
	return (
		<nav className={`nav-content ${className}`}>
			<NavLink to="/" className="nav-link">
				<img src={HomeSVG} alt="Home" className="nav-img" />
				<span className="nav-font">Home</span>
			</NavLink>

			<NavLink to="/favorites" className="nav-link">
				<img src={HeartSVG} alt="Collection" className="nav-img" />
				<span className="nav-font">Favorites</span>
			</NavLink>
		</nav>
	);
}
