import HeartChecked from '@/assets/heart_checked.svg';
import HeartPlus from '@/assets/heart_plus.svg';
import { useFavoritesStore } from '@/stores';

interface ButtonFavoriteProps {
	label?: string;
	onClick?: () => void;
	artworkId: number;
}

const ButtonFavorite = ({ label, artworkId }: ButtonFavoriteProps) => {
	const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
	const isFavorited = isFavorite(artworkId);
	console.log('artworkId:', artworkId); // Debug

	const handleClick = () => {
		if (isFavorited) {
			removeFavorite(artworkId);
		} else {
			addFavorite(artworkId);
		}
	};

	const HeartIcon = isFavorited ? HeartChecked : HeartPlus;
	const buttonLabel =
		label || (isFavorited ? 'Added to Favorites' : 'Add to Favorites');

	return (
		<button onClick={handleClick} className="btn-favorite">
			<img src={HeartIcon} alt="Like it" className="btn-favorite-img" />
			<span className="font-medium">{buttonLabel}</span>
		</button>
	);
};

export default ButtonFavorite;
