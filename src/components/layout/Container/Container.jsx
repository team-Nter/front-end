import clsx from 'clsx';
import * as styles from './Container.css.js';

export default function Container({ className, children }) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}
