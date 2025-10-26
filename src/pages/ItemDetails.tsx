import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { metMuseumApi } from '@/services/metMuseumApi';
import BackSVG from '@/assets/back.svg';

export default function ItemDetails() {
	const { id } = useParams<{ id: string }>();

	const {
		data: artwork,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['metMuseum', 'object', id],
		queryFn: () => metMuseumApi.getObjectDetails(Number(id)),
		enabled: !!id,
		staleTime: 10 * 60 * 1000,
	});

	if (isLoading) {
		return (
			<div className="container mx-auto p-4">
				<p className="text-center">Loading...</p>
			</div>
		);
	}

	if (error || !artwork) {
		return (
			<div className="container mx-auto p-4">
				<p className="text-center text-red-600">
					Error loading artwork details
				</p>
				<Link
					to="/"
					className="block text-center mt-4 text-blue-600 hover:underline"
				>
					Back to Home
				</Link>
			</div>
		);
	}

	return (
		<div className="container-page">
			{/* Back button */}
			<Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-70">
				<img src={BackSVG} alt="Back" className="w-6 h-6" />
				<span>Back to Gallery</span>
			</Link>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold mb-2">
							{artwork.title || 'Untitled'}
						</h1>
					</div>
					<dl className="space-y-4">
						{/* Artist */}
						{artwork.artistDisplayName && (
							<div className="border-b pb-2">
								<dt className="font-semibold text-gray-700">Artist</dt>
								<dd className="mt-1">{artwork.artistDisplayName}</dd>
							</div>
						)}

						{/* Date */}
						{artwork.objectDate && (
							<div className="border-b pb-2">
								<dt className="font-semibold text-gray-700">Date</dt>
								<dd className="mt-1">{artwork.objectDate}</dd>
							</div>
						)}

						{/* Medium */}
						{artwork.medium && (
							<div className="border-b pb-2">
								<dt className="font-semibold text-gray-700">Medium</dt>
								<dd className="mt-1">{artwork.medium}</dd>
							</div>
						)}

						{/* Department */}
						{artwork.department && (
							<div className="border-b pb-2">
								<dt className="font-semibold text-gray-700">Department</dt>
								<dd className="mt-1">{artwork.department}</dd>
							</div>
						)}

						{/* Met Museum URL */}
						<div className="border-b pb-2">
							<dt className="font-semibold text-gray-700">More Info</dt>
							<dd className="mt-1">
								<a
									href={artwork.artistWikidata_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									Wiki: {artwork.artistWikidata_URL}
								</a>
							</dd>
						</div>
					</dl>
				</div>

				{/* Image Area */}
				<div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
					<div className="w-full max-w-[770px] h-[470px] flex items-center justify-center p-4">
						{artwork.primaryImage ? (
							<img
								src={artwork.primaryImage}
								alt={artwork.title || 'Artwork'}
								className="max-w-full max-h-full object-contain"
							/>
						) : (
							<div className="text-gray-400 text-center">
								<p>No image available</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
