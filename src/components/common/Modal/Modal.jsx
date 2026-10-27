import clsx from 'clsx';
import * as styles from './Modal.css.js';

export default function Modal({ className, children }) {
  return (
    <div className={styles.overlay}>
      <div className={clsx(styles.modal, className)}>{children}</div>
    </div>
  );
}
