import React from 'react';
import Loading from './Loading';

type Props = {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
	pageSize?: number; // default: 15
	// Controlled mode (for server/external state fetching):
	// Pass onLoadMore + isLoading + hasMore. The component will call onLoadMore when reaching the end.
	onLoadMore?: (nextPage: number, pageSize: number) => Promise<void> | void;
	isLoading?: boolean;
	hasMore?: boolean;
	// IntersectionObserver fine-tuning
	rootMargin?: string; // prefetch before the end (e.g., '0px 0px 600px 0px')
	threshold?: number;
	loader?: React.ReactNode;
};

const InfiniteScrolling: React.FC<Props> = ({
	children,
	className = '',
	pageSize = 15,
	onLoadMore,
	isLoading = false,
	hasMore = false,
	rootMargin = '0px 0px 600px 0px',
	threshold = 0.01,
	loader,
}) => {
	const childrenArray = React.Children.toArray(children);
	const controlled = typeof onLoadMore === 'function';

	const [visibleCount, setVisibleCount] = React.useState(() =>
		controlled ? childrenArray.length : Math.min(pageSize, childrenArray.length)
	);
	const [localLoading, setLocalLoading] = React.useState(false);
	const sentinelRef = React.useRef<HTMLDivElement | null>(null);
	const fetchingRef = React.useRef(false);
	const pageRef = React.useRef(1);

	// Adjust when the list changes
	React.useEffect(() => {
		if (controlled) return; // parent controls the total displayed
		setVisibleCount((v) =>
			Math.min(Math.max(v, pageSize), childrenArray.length || 0)
		);
	}, [childrenArray.length, controlled, pageSize]);

	const visibleChildren = React.useMemo(() => {
		return controlled
			? childrenArray // in controlled mode, render everything the parent already provided
			: childrenArray.slice(0, visibleCount);
	}, [childrenArray, controlled, visibleCount]);

	const maybeLoadMore = React.useCallback(() => {
		if (fetchingRef.current) return;

		if (controlled) {
			if (!hasMore || isLoading) return;
			fetchingRef.current = true;
			const nextPage = pageRef.current + 1;
			Promise.resolve(onLoadMore?.(nextPage, pageSize))
				.catch(() => {})
				.finally(() => {
					pageRef.current = nextPage;
					fetchingRef.current = false;
				});
			return;
		}

		// Uncontrolled mode: just release more children already in memory
		const canGrow = visibleCount < childrenArray.length;
		if (!canGrow || localLoading) return;

		fetchingRef.current = true;
		setLocalLoading(true);

		const finalize = () => {
			setVisibleCount((v) => Math.min(v + pageSize, childrenArray.length));
			setLocalLoading(false);
			fetchingRef.current = false;
		};

		if (
			'requestIdleCallback' in window &&
			typeof window.requestIdleCallback === 'function'
		) {
			window.requestIdleCallback(() => setTimeout(finalize, 0), {
				timeout: 200,
			});
		} else {
			setTimeout(finalize, 100);
		}
	}, [
		controlled,
		hasMore,
		isLoading,
		onLoadMore,
		pageSize,
		visibleCount,
		childrenArray.length,
		localLoading,
	]);

	React.useEffect(() => {
		const el = sentinelRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					maybeLoadMore();
				}
			},
			{ root: null, rootMargin, threshold }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [maybeLoadMore, rootMargin, threshold]);

	const showLoader = controlled ? isLoading : localLoading;

	return (
		<div className={className}>
			{visibleChildren}
			{showLoader ? loader ?? <Loading /> : null}
			<div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
		</div>
	);
};

export default InfiniteScrolling;
