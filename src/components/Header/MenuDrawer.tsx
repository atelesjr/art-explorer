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
	return (
		<div
			aria-hidden={!open}
			role="dialog"
			className={[
				'fixed top-[60px] right-0 z-30',
				//slide animation
				open ? 'translate-x-0' : 'translate-x-full',
				'transition-transform duration-300 ease-in-out',
				//size
				'w-[200px] h-screen p-2',
				//shadow
				'shadow-lg',
				'bg-met-red text-white',
				className,
			].join(' ')}
		>
			<Navigation />
		</div>
	);
}
