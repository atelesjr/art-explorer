import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_POSITION_KEY = 'home-scroll-position';

/**
 * SRP: Hook handles only scroll position save/restore logic.
 * Dependency Inversion: UI doesn't need to know storage details.
 */
export function useScrollRestoration() {
  const location = useLocation();

  // Disable browser scroll restoration
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Restore scroll position when coming from details
  useEffect(() => {
    if (location.state?.fromDetails) {
      const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
      if (savedPosition) {
        const position = parseInt(savedPosition, 10);
        const attempts = [0, 100, 300, 500, 800];
        attempts.forEach((delay) => {
          setTimeout(() => {
            window.scrollTo(0, position);
          }, delay);
        });

        return () => {
          sessionStorage.removeItem(SCROLL_POSITION_KEY);
        };
      }
    }
  }, [location]);

  // Save scroll position continuously
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Return a cleanup function for search reset
  const clearScrollPosition = () => {
    sessionStorage.removeItem(SCROLL_POSITION_KEY);
  };

  return { clearScrollPosition };
}