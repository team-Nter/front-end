'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import * as styles from './Modal.css.js';

export default function Modal({
  className,
  children,
  onClose,
  onKeyDown,
  ...restProps
}) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;

    dialog.showModal();

    const handleNativeClose = () => {
      // 이전 effect 정리(StrictMode 등)에서 늦게 도착한 close 이벤트는 무시합니다.
      if (!dialog.isConnected || dialog.open) return;
      dialog.showModal();
      onCloseRef.current?.();
    };
    dialog.addEventListener('close', handleNativeClose);

    // 포커스 복원하는 과정
    return () => {
      dialog.removeEventListener('close', handleNativeClose);
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
        onKeyDown={(event) => {
          onKeyDown?.(event);
          // onClose만 실행되게 변경
          // 조합 관련해서 esc가 문제를 발생할 수 있어 해당 부분을 분기로 뒀습니다.
          if (
            event.key === 'Escape' &&
            !event.defaultPrevented &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            onClose?.();
          }
        }}
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
