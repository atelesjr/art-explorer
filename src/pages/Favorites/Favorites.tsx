import { useFavoritesStore } from '@/stores';
import { useFavoritesArtworks } from '@/hooks/useFavoritesArtworks';
import PageLayout from '../layout/PageLayout';
import Gallery from '@/components/Gallery/Gallery';

const Favorites = () => {
	const favorites = useFavoritesStore((s) => s.favorites);
	const {
		data: artworks = [],
		isLoading,
		error,
	} = useFavoritesArtworks(favorites);

	if (favorites.length === 0) {
		return (
			<PageLayout title="Your Favorites">
				<p className="text-gray-600">You haven't added any favorites yet.</p>
			</PageLayout>
		);
	}

	return (
		<PageLayout
			title="Your Favorites"
			headerContent={
				error && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-4">
						<p className="text-red-700">
							Failed to load some favorites. Please try again.
						</p>
					</div>
				)
			}
		>
			<Gallery externalArtworks={artworks} isLoading={isLoading} />
		</PageLayout>
	);
};

export default Favorites;
