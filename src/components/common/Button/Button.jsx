import clsx from 'clsx';
import * as styles from './Button.css';

export default function Button({
  as: Component = 'button',
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  className,
  ...restProps
}) {
  return (
    <Component
      {...(Component === 'button' ? { type: 'button' } : {})}
      {...restProps}
      className={clsx(
        styles.button,
        styles.size[size],
        styles.variant[variant],
        fullWidth && styles.fullWidth,
        className,
      )}
    />
  );
}
