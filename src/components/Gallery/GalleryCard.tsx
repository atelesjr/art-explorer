import type { ArtworkItem } from './types';

const GalleryCard = ({ displayItems }: { displayItems: ArtworkItem[] }) => {
	return (
		<div className="gallery-grid">
			{displayItems.map((item) => (
				<figure key={item.id} className="gallery-card">
					<div className="gallery-image-wrapper">
						<img
							src={item.imageUrl}
							alt={item.title}
							className="gallery-image"
							loading="lazy"
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

export default GalleryCard;
