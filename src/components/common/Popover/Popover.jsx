'use client';

import { cloneElement, useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import * as styles from './Popover.css.js';

export default function Popover({
  trigger,
  children,
  className,
  align = 'left',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const panelId = useId();
  const close = () => {
    setIsOpen(false);
    rootRef.current?.firstElementChild?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const closeOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        rootRef.current?.firstElementChild?.focus();
      }
    };

    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('focusin', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('focusin', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const handleTriggerClick = (event) => {
    trigger.props.onClick?.(event);
    if (!event.defaultPrevented) {
      setIsOpen((previous) => !previous);
    }
  };

  return (
    <div ref={rootRef} className={styles.root}>
      {cloneElement(trigger, {
        ...(trigger.type === 'button'
          ? { type: trigger.props.type ?? 'button' }
          : {}),
        'aria-expanded': isOpen,
        'aria-controls': isOpen ? panelId : undefined,
        onClick: handleTriggerClick,
      })}
      {isOpen && (
        <div
          id={panelId}
          className={clsx(styles.panel, styles.align[align], className)}
        >
          {/* close는 렌더 중 호출하지 않고 패널 내부 이벤트 핸들러에서 사용합니다. */}
          {/* eslint-disable-next-line react-hooks/refs -- Passing an event callback; refs are read only when close is invoked. */}
          {typeof children === 'function' ? children({ close }) : children}
        </div>
      )}
    </div>
  );
}
