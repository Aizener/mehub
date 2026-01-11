import { useEffect, useState } from 'react';

/**
 * Hook to detect if the current viewport is desktop (md breakpoint and above)
 * Uses Tailwind's md breakpoint (768px) to distinguish between mobile and desktop
 * @returns true if desktop (>= 768px), false if mobile (< 768px)
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Tailwind md breakpoint is 768px
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    // Set initial value
    setIsDesktop(mediaQuery.matches);

    // Create event listener
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    // Add listener (modern browsers)
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isDesktop;
}

/**
 * Hook to detect if the current viewport is mobile (below md breakpoint)
 * Uses Tailwind's md breakpoint (768px) to distinguish between mobile and desktop
 * @returns true if mobile (< 768px), false if desktop (>= 768px)
 */
export function useIsMobile() {
  const isDesktop = useIsDesktop();
  return !isDesktop;
}
