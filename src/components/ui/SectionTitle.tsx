import type { FC } from 'react';
import styles from './SectionTitle.module.css';

type TitleAlign = 'left' | 'center' | 'right';

interface SectionTitleProps {
  heading: string;
  eyebrow?: string;
  sub?: string;
  align?: TitleAlign;
  className?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({
  heading,
  eyebrow,
  sub,
  align = 'left',
  className = '',
}) => {
  const classes = [
    styles['section-title'],
    align !== 'left' ? styles[`section-title--${align}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {eyebrow && (
        <span className={styles['section-title__eyebrow']}>{eyebrow}</span>
      )}
      <h2 className={styles['section-title__heading']}>{heading}</h2>
      <span className={styles['section-title__bar']} aria-hidden="true" />
      {sub && <p className={styles['section-title__sub']}>{sub}</p>}
    </div>
  );
};

export default SectionTitle;
