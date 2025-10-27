import { useNavigate } from 'react-router-dom';
import BackSVG from '@/assets/back.svg';

const BackButton = () => {
	const navigate = useNavigate();
	return (
		<button
			type="button"
			onClick={() => navigate(-1)}
			className="inline-flex items-center gap-2 mb-4 hover:opacity-70"
		>
			<img src={BackSVG} alt="Back" className="w-6 h-6" />
			<span>Back</span>
		</button>
	);
};
export default BackButton;
