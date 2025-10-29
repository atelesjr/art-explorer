import axios from 'axios';
import type {
	MetMuseumSearchResponse,
	MetMuseumObjectDetails,
} from '@/types/metMuseum';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

// Create axios instance with default config
const apiClient = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('API Error:', error.message);
		return Promise.reject(error);
	}
);

export const metMuseumApi = {
	/**
	 * Search for artworks (general search for default state)
	 * @param query - Search term (e.g., 'painting', 'sunflowers')
	 * @returns Array of object IDs
	 */
	searchArtworks: async (
		query: string = 'painting'
	): Promise<MetMuseumSearchResponse> => {
		const { data } = await apiClient.get<MetMuseumSearchResponse>('/search', {
			params: {
				hasImages: true,
				q: query.toLowerCase(),
			},
		});

		return data;
	},

	/**
	 * Search for artworks by artist or culture
	 * @param query - Artist or culture name (should be lowercase, e.g., 'van gogh', 'dutch')
	 * @returns Array of object IDs
	 */
	searchByArtistOrCulture: async (
		query: string
	): Promise<MetMuseumSearchResponse> => {
		const { data } = await apiClient.get<MetMuseumSearchResponse>('/search', {
			params: {
				artistOrCulture: true,
				hasImages: true,
				q: query.toLowerCase(),
			},
		});

		return data;
	},

	/**
	 * Get details for a specific artwork
	 * @param objectId - The Met object ID
	 * @returns Artwork details
	 */
	getObjectDetails: async (
		objectId: number
	): Promise<MetMuseumObjectDetails> => {
		const { data } = await apiClient.get<MetMuseumObjectDetails>(
			`/objects/${objectId}`
		);
		return data;
	},

	/**
	 * Batch fetch multiple artwork details with error handling
	 * Filters out failed requests to ensure partial success
	 * @param objectIds - Array of object IDs to fetch
	 * @returns Array of successfully fetched artwork details
	 */
	batchGetObjectDetails: async (
		objectIds: number[]
	): Promise<MetMuseumObjectDetails[]> => {
		const promises = objectIds.map((id) =>
			metMuseumApi.getObjectDetails(id).catch((error) => {
				console.warn(`Failed to fetch object ${id}:`, error.message);
				return null;
			})
		);

		const results = await Promise.all(promises);
		return results.filter(
			(item): item is MetMuseumObjectDetails => item !== null
		);
	},
};
