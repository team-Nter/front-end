'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import * as styles from './Modal.css.js';

export default function Modal({ className, children, onClose, ...restProps }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;

    dialog.showModal();

    // 포커스 복원하는 과정
    return () => {
      dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <dialog
        {...restProps}
        ref={dialogRef}
        className={clsx(styles.modal, className)}
        onCancel={(event) => {
          event.preventDefault();
          onClose?.();
        }}
      >
        {children}
      </dialog>
    </div>
  );
}
