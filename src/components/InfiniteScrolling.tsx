import {
	Children,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type FC,
	type ReactNode,
} from 'react';
import Loading from './Loading';

type Props = {
	children: ReactNode | ReactNode[];
	className?: string;
	pageSize?: number;
	onLoadMore?: () => Promise<void> | void;
	isLoading?: boolean;
	hasMore?: boolean;
	rootMargin?: string;
	threshold?: number;
	loader?: ReactNode;
};

/**
 * InfiniteScrolling component.
 * SRP: Only handles scroll detection and triggers load.
 * Parent controls data/state (Dependency Inversion).
 */
const InfiniteScrolling: FC<Props> = ({
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
	const childrenArray = Children.toArray(children);
	const controlled = typeof onLoadMore === 'function';

	// Uncontrolled mode: slice children locally
	const [visibleCount, setVisibleCount] = useState(() =>
		controlled ? childrenArray.length : Math.min(pageSize, childrenArray.length)
	);
	const [localLoading, setLocalLoading] = useState(false);

	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const loadingRef = useRef(false);

	// Sync visible count when children change (uncontrolled)
	useEffect(() => {
		if (controlled) return;
		setVisibleCount((v) =>
			Math.min(Math.max(v, pageSize), childrenArray.length)
		);
	}, [childrenArray.length, controlled, pageSize]);

	const visibleChildren = useMemo(() => {
		return controlled ? childrenArray : childrenArray.slice(0, visibleCount);
	}, [childrenArray, controlled, visibleCount]);

	// Stable load trigger
	const triggerLoad = useCallback(() => {
		if (loadingRef.current) return;

		if (controlled) {
			if (!hasMore || isLoading) return;
			loadingRef.current = true;
			Promise.resolve(onLoadMore?.())
				.catch(() => {})
				.finally(() => {
					loadingRef.current = false;
				});
			return;
		}

		// Uncontrolled: load more from local array
		const canGrow = visibleCount < childrenArray.length;
		if (!canGrow || localLoading) return;

		loadingRef.current = true;
		setLocalLoading(true);

		const finalize = () => {
			setVisibleCount((v) => Math.min(v + pageSize, childrenArray.length));
			setLocalLoading(false);
			loadingRef.current = false;
		};

		if ('requestIdleCallback' in window) {
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

	// IntersectionObserver setup
	useEffect(() => {
		const el = sentinelRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) triggerLoad();
			},
			{ root: null, rootMargin, threshold }
		);

		observer.observe(el);
		return () => {
			observer.disconnect();
			loadingRef.current = false; // cleanup on unmount
		};
	}, [triggerLoad, rootMargin, threshold]);

	const showLoader = controlled ? isLoading : localLoading;

	return (
		<div className={className}>
			{visibleChildren}
			{showLoader && (loader ?? <Loading />)}
			<div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
		</div>
	);
};

export default InfiniteScrolling;
