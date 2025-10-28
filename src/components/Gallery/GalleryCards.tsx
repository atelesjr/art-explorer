import type { ArtworkItem } from '@/types/metMuseum';
import { useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';
import { usePrefetchMetObject } from '@/hooks/usePrefetchMetObject';

interface GalleryCardsProps {
	displayItems: ArtworkItem[];
}

const Card = React.memo(function Card({
	item,
	onOpen,
	onPrefetch,
}: {
	item: ArtworkItem;
	onOpen: (id: number) => void;
	onPrefetch: (id: number) => void;
}) {
	return (
		<figure
			key={item.id}
			className="gallery-card"
			role="button"
			tabIndex={0}
			aria-label={`Open details for ${item.title}`}
			onMouseEnter={() => onPrefetch(item.id)}
			onFocus={() => onPrefetch(item.id)}
			onClick={() => onOpen(item.id)}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onOpen(item.id);
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
	);
});

const GalleryCards = React.memo(({ displayItems }: GalleryCardsProps) => {
	const navigate = useNavigate();
	const prefetchDetails = usePrefetchMetObject();

	const openDetails = useCallback((id: number) => {
		navigate(`/item/${id}`);
	}, [navigate]);

	return (
		<div className="gallery-grid">
			{displayItems.map((item) => (
				<Card
					key={item.id}
					item={item}
					onOpen={openDetails}
					onPrefetch={prefetchDetails}
				/>
			))}
		</div>
	);
});

export default GalleryCards;
