import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { metMuseumApi } from '@/services/metMuseumApi';
import BackSVG from '@/assets/back.svg';
import ButtonFavorite from '@/components/Buttons/Favorite';
import Details from './Details';
import RenderImage from './renderImage';

export default function ArtDetails() {
	const { id } = useParams<{ id: string }>();

	const {
		data: artwork,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['metMuseum', 'object', id],
		queryFn: () => metMuseumApi.getObjectDetails(Number(id)),
		enabled: !!id,
		staleTime: 10 * 60 * 1000,
	});

	if (error || !artwork) {
		return (
			<div className="container-page flex flex-col items-center justify-center">
				<p className="text-center text-red-600">
					Error loading artwork details
				</p>
				<Link
					to="/"
					className="inline-flex items-center gap-2 mb-4 hover:opacity-70"
				>
					<img src={BackSVG} alt="Back" className="w-6 h-6" />
					<span>Back</span>
				</Link>
			</div>
		);
	}

	return (
		<div className="container-page">
			{/* Back button */}
			<Link
				to="/"
				className="inline-flex items-center gap-2 mb-4 hover:opacity-70"
			>
				<img src={BackSVG} alt="Back" className="w-6 h-6" />
				<span>Back</span>
			</Link>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold mb-2">
							{artwork.title || 'Untitled'}
						</h1>
					</div>

					<Details artwork={artwork} />

					<div className="">
						<ButtonFavorite onClick={() => {}} />
					</div>
				</div>

				{/* Image Area: 770x470, blur-up small → fade-in large */}
				<RenderImage artwork={artwork} isLoading={isLoading} />
			</div>
		</div>
	);
}
