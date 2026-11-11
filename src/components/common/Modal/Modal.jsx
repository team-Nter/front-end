'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import * as styles from './Modal.css.js';

// 조합이 끝난 직후 이 시간(ms) 안에 들어온 ESC는 조합 취소용으로 봅니다.
const IME_ESCAPE_GUARD_MS = 100;

export default function Modal({
  className,
  children,
  onClose,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  ...restProps
}) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const isComposingRef = useRef(false);
  const compositionEndAtRef = useRef(-Infinity);

  // mac 입력기는 esc를 받으면 조합을 먼저 끝낸 뒤 esc를 넘겨주기 때문에
  // keydown 시점의 isComposing만으로는 알 수 없어 이런 식의 진행
  const isImeEscape = () =>
    isComposingRef.current ||
    performance.now() - compositionEndAtRef.current < IME_ESCAPE_GUARD_MS;

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
      if (isImeEscape()) return;
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
        onCompositionStart={(event) => {
          onCompositionStart?.(event);
          isComposingRef.current = true;
        }}
        onCompositionEnd={(event) => {
          onCompositionEnd?.(event);
          isComposingRef.current = false;
          compositionEndAtRef.current = performance.now();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key !== 'Escape' || event.defaultPrevented) return;

          event.preventDefault();

          // 한글 조합 중의 ESC는 조합 취소용이므로 모달을 닫지 않습니다.

          if (event.nativeEvent.isComposing || isImeEscape()) {
            return;
          }

          onClose?.();
        }}
        onCancel={(event) => {
          event.preventDefault();
          // 입력기가 esc를 가져가 keydown이 escape로 오지 않은 경우도 여기서 막기.
          if (isImeEscape()) return;
          onClose?.();
        }}
      >
        {children}
      </dialog>
    </div>
  );
}
