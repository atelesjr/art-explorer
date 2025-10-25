interface HamburgerMenuProps {
	isOpen: boolean;
	onToggle: () => void;
	className?: string;
}

export function HamburgerMenu({
	isOpen,
	onToggle,
	className = '',
}: HamburgerMenuProps) {
	return (
		<div
			className={`hamburger sm:hidden ${isOpen ? 'active' : ''} ${className}`}
			onClick={onToggle}
		>
			<div className="bar" />
			<div className="bar" />
			<div className="bar" />
		</div>
	);
}
