export interface MetMuseumSearchResponse {
	total: number;
	objectIDs: number[];
}

export interface MetMuseumObjectDetails {
	objectURL: string | undefined;
	objectID: number;
	title: string;
	artistDisplayName: string;
	objectEndDate: string;
	objectDate: string;
	medium: string;
	department: string;
	culture: string;
	primaryImage: string;
	primaryImageSmall: string;
	artistWikidata_URL: string;
}

export interface ArtworkItem {
	id: number;
	title: string;
	artist: string;
	date: string;
	imageUrl: string;
}
