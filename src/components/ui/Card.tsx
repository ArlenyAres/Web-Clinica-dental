import type { FC, HTMLAttributes, ElementType } from 'react';
import styles from './Card.module.css';

type CardVariant = 'default' | 'flat' | 'teal-accent';
type CardPadding = 'none' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  as?: ElementType;
}

const Card: FC<CardProps> = ({
  variant = 'default',
  padding = 'none',
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}) => {
  const paddingClass: Record<CardPadding, string> = {
    none: '',
    md: styles['card--padded'],
    lg: styles['card--padded-lg'],
  };

  const variantClass: Record<CardVariant, string> = {
    default: '',
    flat: styles['card--flat'],
    'teal-accent': styles['card--teal-accent'],
  };

  const classes = [
    styles['card'],
    variantClass[variant],
    paddingClass[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...(rest as object)}>
      {children}
    </Tag>
  );
};

export default Card;
