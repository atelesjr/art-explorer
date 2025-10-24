import HomeOffSVG from '@/assets/home_off.svg';
import HallwaySVG from '@/assets/hallway.svg';

interface NavigationProps {
    className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
    return (
        <nav className={`flex gap-x-4 ${className}`}>
            <a href="#home" className="nav-link">
                <img src={HomeOffSVG} alt="Home" className="nav-img" />
                <span className="nav-font">Home</span>
            </a>
            <a href="#collection" className="nav-link">
                <img src={HallwaySVG} alt="Collection" className="nav-img" />
                <span className="nav-font">Your Collection</span>
            </a>
        </nav>
    );
}