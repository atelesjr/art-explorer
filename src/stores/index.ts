import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
	favorites: number[];
	addFavorite: (id: number) => void;
	removeFavorite: (id: number) => void;
	isFavorite: (id: number) => boolean;
	clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],

			addFavorite: (id) => {
				const current = get().favorites;
				if (!current.includes(id)) {
					set({ favorites: [...current, id] });
					console.log('Added to favorites:', id, 'Current:', [...current, id]); // Debug
				}
			},

			removeFavorite: (id) => {
				set((state) => ({
					favorites: state.favorites.filter((fav) => fav !== id),
				}));
				console.log('Removed from favorites:', id); // Debug
			},

			isFavorite: (id) => {
				const result = get().favorites.includes(id);
				console.log(
					`isFavorite(${id}):`,
					result,
					'All favorites:',
					get().favorites
				); // Debug
				return result;
			},

			clearFavorites: () => set({ favorites: [] }),
		}),
		{
			name: 'met-museum-favorites',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
