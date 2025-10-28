import { useNavigate } from 'react-router-dom';
import BackSVG from '@/assets/back.svg';

const BackButton = () => {
	const navigate = useNavigate();
	const canGoBack = window.history.length > 1;

	const handleClick = () => {
		if (canGoBack) navigate(-1);
		else navigate('/');
	};

	return (
		<button type="button" onClick={handleClick} className="btn-back">
			<img src={BackSVG} alt="" aria-hidden="true" className="w-6 h-6" />
			<span>Back</span>
		</button>
	);
};
export default BackButton;
