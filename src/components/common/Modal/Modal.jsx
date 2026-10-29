import clsx from 'clsx';
import * as styles from './Modal.css.js';

export default function Modal({ className, children, ...restProps }) {
  return (
    <div className={styles.overlay}>
      <div
        className={clsx(styles.modal, className)}
        role="dialog"
        aria-modal="true"
        {...restProps}
      >
        {children}
      </div>
    </div>
  );
}
