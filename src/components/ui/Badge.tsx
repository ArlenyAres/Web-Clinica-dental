import type { FC } from 'react';
import styles from './Badge.module.css';

type BadgeColor = 'teal' | 'navy' | 'white' | 'gray';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  className?: string;
}

const Badge: FC<BadgeProps> = ({ label, color = 'teal', className = '' }) => {
  const classes = [
    styles['badge'],
    styles[`badge--${color}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{label}</span>;
};

export default Badge;
