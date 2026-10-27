import clsx from 'clsx';
import * as styles from './Input.css.js';

export default function Input({ type = 'text', className, ...restProps }) {
  return (
    <input
      type={type}
      className={clsx(styles.input, className)}
      {...restProps}
    />
  );
}
