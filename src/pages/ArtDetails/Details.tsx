import type { MetMuseumObjectDetails } from '@/types/metMuseum';

interface DetailsProp {
	artwork: MetMuseumObjectDetails;
}

interface DetailProps {
	label: string;
	content: string;
}

const Detail = ({ label, content }: DetailProps) => {
	return (
		<div className="border-b border-gray-300 pb-2">
			<dt className="font-semibold text-gray-700">{label}</dt>
			<dd className="mt-1">{content}</dd>
		</div>
	);
};

const Details = ({ artwork }: DetailsProp) => {
	const { artistDisplayName, objectDate, medium, department } = artwork;
	return (
		<dl className="space-y-4">
			{artistDisplayName && (
				<Detail label="Artist" content={artistDisplayName} />
			)}

			{objectDate && <Detail label="Date" content={objectDate} />}

			{medium && <Detail label="Medium" content={medium} />}

			{department && <Detail label="Department" content={department} />}
		</dl>
	);
};

export default Details;
