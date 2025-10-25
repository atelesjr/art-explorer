export interface MetMuseumSearchResponse {
    total: number;
    objectIDs: number[];
}

export interface MetMuseumObjectDetails {
    objectID: number;
    title: string;
    artistDisplayName: string;
    objectEndDate: string;
    primaryImage: string;
    primaryImageSmall: string;
}

export interface ArtworkItem {
    id: number;
    title: string;
    artist: string;
    date: string;
    imageUrl: string;
}