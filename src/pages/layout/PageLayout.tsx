import { type FC, type ReactNode } from 'react';
import BackButton from '@/components/Buttons/Back';

interface PageLayoutProps {
	title: string;
	showBackButton?: boolean;
	children: ReactNode;
	headerContent?: ReactNode;
}
const PageLayout: FC<PageLayoutProps> = ({
	title,
	showBackButton = true,
	children,
	headerContent,
}) => {
	return (
		<div className="container-page">
			{showBackButton && <BackButton />}
			<div className="mb-6">
				<h1 className="text-3xl font-bold mb-4">{title}</h1>
				{headerContent}
			</div>
			{children}
		</div>
	);
};

export default PageLayout;
