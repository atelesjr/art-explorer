import type { ArtworkItem } from '@/types/metMuseum';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { metMuseumApi } from '@/services/metMuseumApi';

interface GalleryCardsProps {
	displayItems: ArtworkItem[];
}

const GalleryCards = ({ displayItems }: GalleryCardsProps) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const prefetchDetails = async (id: number) => {
		try {
			const data = await queryClient.ensureQueryData({
				queryKey: ['metMuseum', 'object', id.toString()],
				queryFn: () => metMuseumApi.getObjectDetails(id),
				staleTime: 10 * 60 * 1000,
			});
			if (data?.primaryImage) {
				const img = new Image();
				img.src = data.primaryImage;
			}
		} catch {
			// ignore prefetch errors
		}
	};

	return (
		<div className="gallery-grid">
			{displayItems.map((item) => (
				<figure
					key={item.id}
					className="gallery-card"
					role="button"
					tabIndex={0}
					aria-label={`Open details for ${item.title}`}
					onMouseEnter={() => prefetchDetails(item.id)}
					onFocus={() => prefetchDetails(item.id)}
					onClick={() => navigate(`/item/${item.id}`)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							navigate(`/item/${item.id}`);
						}
					}}
				>
					<div className="gallery-image-wrapper">
						<img
							src={item.imageUrl}
							alt={item.title}
							className="gallery-image"
							loading="lazy"
							decoding="async"
						/>
					</div>
					<figcaption className="gallery-content">
						<h3 className="gallery-title">{item.title}</h3>
						<p className="gallery-artist">{item.artist}</p>
						<p className="gallery-date">{item.date}</p>
					</figcaption>
				</figure>
			))}
		</div>
	);
};

export default GalleryCards;
