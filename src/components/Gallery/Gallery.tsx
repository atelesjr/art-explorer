import type { ArtworkItem, GalleryProps } from './types';
import GalleryCardSkeleton from './GalleryCardSkeleton';
import GalleryCard from './GalleryCard';

const Gallery = ({
	items = [],
	isLoading = false,
	className = '',
}: GalleryProps) => {
	// Dados de exemplo (depois você vai buscar da API)
	const mockItems: ArtworkItem[] = [
		{
			id: 1,
			title: 'Powder Horn',
			artist: 'American',
			date: '1794',
			imageUrl:
				'https://images.metmuseum.org/CRDImages/aa/mobile-large/37.131.29_001Sept2014.jpg',
		},
		{
			id: 2,
			title: 'Double moon flask',
			artist: 'Minton(s)',
			date: 'December 1873',
			imageUrl:
				'https://images.metmuseum.org/CRDImages/es/mobile-large/DP-16489-060.jpg',
		},
		{
			id: 3,
			title: 'Astrolabe made for Cardinal Bessarion (1403–1472)',
			artist: 'Regiomontanus',
			date: '1462',
			imageUrl:
				'https://images.metmuseum.org/CRDImages/cl/mobile-large/MEDCLOIS-1159-s1.jpg',
		},
		{
			id: 4,
			title: 'Wall Vase',
			artist: 'China',
			date: '18th century',
			imageUrl:
				'https://images.metmuseum.org/CRDImages/as/mobile-large/29_110_39.jpg',
		},
		{
			id: 5,
			title: 'Powder Horn',
			artist: 'American',
			date: '1794',
			imageUrl:
				'https://images.metmuseum.org/CRDImages/ci/mobile-large/1993.157.2_F.jpg',
		},
		{
			id: 6,
			title: 'Double moon flask',
			artist: 'Minton(s)',
			date: 'December 1873',
			imageUrl:
				'https://images.metmuseum.org/CRDImages/an/mobile-large/ss1985_192_4.jpg',
		},
		{
			id: 7,
			title: 'Astrolabe made for Cardinal Bessarion (1403–1472)',
			artist: 'Regiomontanus',
			date: '1462',
			imageUrl:
				'https://images.metmuseum.org/CRDImages/dp/mobile-large/DPB878859.jpg',
		},
		{
			id: 8,
			title: 'Wall Vase',
			artist: 'China',
			date: '18th century',
			imageUrl:
				'https://images.metmuseum.org/CRDImages/an/mobile-large/ME1983_535_15.jpg',
		},
	];

	const displayItems = items.length > 0 ? items : mockItems;

	if (isLoading) {
		return (
			<section className={`gallery-container ${className}`}>
				<div className="gallery-grid">
					{Array.from({ length: 15 }).map((_, index) => (
						<GalleryCardSkeleton key={index} />
					))}
				</div>
			</section>
		);
	}

	if (displayItems.length === 0) {
		return (
			<section className={`gallery-container ${className}`}>
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No artworks found</p>
				</div>
			</section>
		);
	}
	return (
		<section className={`gallery-container ${className}`}>
			<GalleryCard displayItems={displayItems} />
		</section>
	);
};

export default Gallery;
