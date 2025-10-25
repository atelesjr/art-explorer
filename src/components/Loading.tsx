import React from 'react';

type LoadingProps = {
	label?: string;
	className?: string;
};

const Loading: React.FC<LoadingProps> = ({
	label = 'Loading…',
	className = '',
}) => {
	return (
		<div
			className={`flex items-center justify-center py-4 ${className}`}
			role="status"
			aria-live="polite"
			aria-busy="true"
		>
			<span className="mr-3 inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
			<span className="text-sm text-gray-600">{label}</span>
		</div>
	);
};

export default Loading;
