import type { FC, SVGProps } from 'react';
import styles from './Icon.module.css';

type IconSize  = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type IconColor = 'teal' | 'navy' | 'white' | 'gray' | 'inherit';

interface IconProps {
  /** SVG path(s) or <g> content rendered inside the svg wrapper */
  children: React.ReactNode;
  size?: IconSize;
  color?: IconColor;
  /** Renders with a circular teal-light background */
  circle?: boolean;
  label?: string;     // aria-label for standalone icons
  className?: string;
  svgProps?: SVGProps<SVGSVGElement>;
}

const Icon: FC<IconProps> = ({
  children,
  size = 'md',
  color = 'inherit',
  circle = false,
  label,
  className = '',
  svgProps,
}) => {
  const classes = [
    styles['icon'],
    styles[`icon--${size}`],
    color !== 'inherit' ? styles[`icon--${color}`] : '',
    circle ? styles['icon--circle'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        {...svgProps}
      >
        {children}
      </svg>
    </span>
  );
};

export default Icon;
