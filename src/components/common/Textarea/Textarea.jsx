import clsx from 'clsx';
import * as styles from './Textarea.css.js';

export default function Textarea({ rows = 4, className, ...restProps }) {
  return (
    <textarea
      rows={rows}
      className={clsx(styles.textarea, className)}
      {...restProps}
    />
  );
}
