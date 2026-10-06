import { useIntersection } from '../../hooks/useIntersection';
import styles from './RevealSection.module.css';

interface RevealSectionProps {
  children:   React.ReactNode;
  className?: string;
  /** Transition delay in ms — applied via inline style */
  delay?:     number;
}

/**
 * Wraps any section in a scroll-triggered fade-up reveal.
 * Uses `useIntersection` (triggerOnce) so the animation plays once.
 */
export default function RevealSection({ children, className = '', delay }: RevealSectionProps) {
  const [ref, isVisible] = useIntersection<HTMLDivElement>({ threshold: 0.08 });

  return (
    <div
      ref={ref}
      className={[styles['reveal'], isVisible ? styles['reveal--visible'] : '', className]
        .filter(Boolean)
        .join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
