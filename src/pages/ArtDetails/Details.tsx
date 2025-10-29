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
		<div className="detail-content">
			<dt>{label}</dt>
			<dd>{content}</dd>
		</div>
	);
};

const Details = ({ artwork }: DetailsProp) => {
	const { artistDisplayName, objectDate, medium, department } = artwork;
	return (
		<dl className="details-content">
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
