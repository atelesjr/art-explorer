interface ButtonHamburgerProps {
	isOpen: boolean;
	onToggle: () => void;
	className?: string;
}

const ButtonHamburger = ({
	isOpen,
	onToggle,
	className = '',
}: ButtonHamburgerProps) => {
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
};

export default ButtonHamburger;
