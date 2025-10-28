import { useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { metMuseumApi } from '@/services/metMuseumApi';

export function usePrefetchMetObject(staleTime = 10 * 60 * 1000) {
  const qc = useQueryClient();
  const timer = useRef<number | null>(null);

  // Debounced prefetch to avoid spamming on fast hovers
  const prefetch = useCallback((id: number, delay = 120) => {
    if (!id) return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      try {
        const data = await qc.ensureQueryData({
          queryKey: ['metMuseum', 'object', String(id)],
          queryFn: () => metMuseumApi.getObjectDetails(id),
          staleTime,
        });
        if (data?.primaryImage) {
          const img = new Image();
          img.src = data.primaryImage;
        }
      } catch {
        // ignore prefetch errors
      }
    }, delay);
  }, [qc, staleTime]);

  return prefetch;
}