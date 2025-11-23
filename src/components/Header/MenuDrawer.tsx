import DayNightButton from '../Buttons/DayNight';
import { Navigation } from './Navigation';

type MenuDrawerProps = {
	open: boolean;
	offsetTop?: number;
	className?: string;
	bgClassName?: string;
	onToggle?: () => void;
};

export function MenuDrawer({
	open,

	className = '',
}: MenuDrawerProps) {
	const position = open ? 'translate-x-0' : 'translate-x-full';
	return (
		<div
			aria-hidden={!open}
			role="dialog"
			className={`menu-drawer ${position} ${className}`}
		>
			<Navigation />
			<div className="menu-drawer-theme">
				<DayNightButton />
			</div>
		</div>
	);
}
