import { useEffect, useRef, useState } from 'react';

interface UseIntersectionOptions extends IntersectionObserverInit {
  /** Once true, stop observing (default: true) */
  triggerOnce?: boolean;
}

/**
 * Returns a ref to attach to a DOM element and a boolean indicating
 * whether the element has entered the viewport.
 */
export function useIntersection<T extends Element>(
  options: UseIntersectionOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { triggerOnce = true, threshold = 0.15, rootMargin = '0px', root = null } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnce, threshold, rootMargin, root]);

  return [ref, isVisible];
}
