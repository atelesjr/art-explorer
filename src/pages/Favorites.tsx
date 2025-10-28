import { useQuery } from '@tanstack/react-query';
import { useFavoritesStore } from '@/stores';
import { metMuseumApi } from '@/services/metMuseumApi';
import BackButton from '@/components/Buttons/Back';
import Gallery from '@/components/Gallery/Gallery';
import type { ArtworkItem } from '@/types/metMuseum';

const transformToArtworkItem = (
	details: Awaited<ReturnType<typeof metMuseumApi.getObjectDetails>>
): ArtworkItem => ({
	id: details.objectID,
	title: details.title || 'Untitled',
	artist: details.artistDisplayName || 'Unknown Artist',
	date: details.objectEndDate || 'Unknown Date',
	imageUrl: details.primaryImageSmall || details.primaryImage || '',
});

const Favorites = () => {
	const favorites = useFavoritesStore((s) => s.favorites);

	const { data: artworks = [], isLoading, error } = useQuery({
		queryKey: ['favorites', favorites],
		queryFn: async () => {
			if (favorites.length === 0) return [];
			const results = await Promise.allSettled(
				favorites.map((id) => metMuseumApi.getObjectDetails(id))
			);
			return results
				.filter(
					(
						r
					): r is PromiseFulfilledResult<
						Awaited<ReturnType<typeof metMuseumApi.getObjectDetails>>
					> => r.status === 'fulfilled'
				)
				.map((r) => transformToArtworkItem(r.value));
		},
		enabled: favorites.length > 0,
		staleTime: 10 * 60 * 1000,
	});

	if (favorites.length === 0) {
		return (
			<div className="container-page">
				<BackButton />
				<h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
				<p className="text-gray-600">You haven't added any favorites yet.</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container-page">
				<BackButton />
				<h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
				<p className="text-red-600">Error loading favorites</p>
			</div>
		);
	}

	return (
		<div className="container-page">
			<BackButton />
			<h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
			<Gallery externalArtworks={artworks} isLoading={isLoading} />
		</div>
	);
};

export default Favorites;
