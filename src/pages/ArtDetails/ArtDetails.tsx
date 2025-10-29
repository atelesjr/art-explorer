import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { metMuseumApi } from '@/services/metMuseumApi';

import ButtonFavorite from '@/components/Buttons/Favorite';
import Details from './Details';
import RenderImage from './RenderImage';
import BackButton from '@/components/Buttons/Back';

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
			<div className="container-page art-details-error">
				<p className="art-details-error-p">Error loading artwork details</p>
				<BackButton />
			</div>
		);
	}

	return (
		<div className="container-page">
			<BackButton />
			<div className="art-details">
				<div className="art-details-info">
					<h1 className="art-details-title">{artwork.title || 'Untitled'}</h1>
					<Details artwork={artwork} />
					<ButtonFavorite artworkId={Number(id)} />
				</div>

				{/* Image Area: 770x470, blur-up small → fade-in large */}
				<div className="art-details-image">
					<h1 className="art-details-title-mobile">
						{artwork.title || 'Untitled'}
					</h1>
					<RenderImage artwork={artwork} isLoading={isLoading} />
				</div>
			</div>
		</div>
	);
}
