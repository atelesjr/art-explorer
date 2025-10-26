import { useState } from 'react';
import HeartChecked from '@/assets/heart_checked.svg';
import HeartPlus from '@/assets/heart_plus.svg';

interface ButtonFavoriteProps {
	label?: string;
	onClick?: () => void;
}

const ButtonFavorite = ({ label, onClick }: ButtonFavoriteProps) => {
	const [isFavorited, setIsFavorited] = useState(false);

	const handleClick = () => {
		setIsFavorited(!isFavorited);
		if (onClick) onClick();
	};

	const HeartIcon = isFavorited ? HeartChecked : HeartPlus;
	const buttonLabel =
		label || (isFavorited ? 'Added to Favorites' : 'Add to Favorites');

	return (
		<button
			onClick={handleClick}
			className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
		>
			<img src={HeartIcon} alt="Like it" className={`w-8 h-auto`} />
			<span className="font-medium">{buttonLabel}</span>
		</button>
	);
};

export default ButtonFavorite;
