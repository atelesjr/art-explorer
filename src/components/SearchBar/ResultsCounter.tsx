import { memo } from 'react';

interface ResultsCounterProps {
  count: number;
  query: string;
}

/**
 * SRP: Only displays results count.
 * Memoized to prevent re-renders when parent updates.
 */
const ResultsCounter = memo(({ count, query }: ResultsCounterProps) => {
  if (!query || count === 0) return null;

  return (
    <div className="mt-4 mb-6">
      <p className="text-gray-600 text-sm">
        Results: <span className="font-semibold">{count}</span> images
      </p>
    </div>
  );
});

ResultsCounter.displayName = 'ResultsCounter';

export default ResultsCounter;