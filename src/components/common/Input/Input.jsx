'use client';

import clsx from 'clsx';
import { useId, useState } from 'react';
import * as styles from './Input.css.js';
import * as fieldStyles from '../TextField.css.js';
import visibilityOff from '@/assets/icons/visibility-off.svg';
import visibilityOn from '@/assets/icons/visibility-on.svg';
import Image from 'next/image.js';

export default function Input({
  type = 'text',
  id,
  label,
  labelClassName,
  error,
  className,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${generatedId}-error`;
  const descriptionIds =
    [describedBy, error ? errorId : undefined].filter(Boolean).join(' ') ||
    undefined;

  const [isVisible, setIsVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && isVisible ? 'text' : type;

  return (
    <div className={clsx(fieldStyles.field, styles.field)}>
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(fieldStyles.label, labelClassName)}
        >
          {label}
        </label>
      )}
      <input
        {...restProps}
        id={inputId}
        type={inputType}
        className={clsx(styles.input, className)}
        aria-invalid={error ? true : (ariaInvalid ?? false)}
        aria-describedby={descriptionIds}
      />
      {isPassword && (
        <Image
          className={styles.visibility}
          src={isVisible ? visibilityOn : visibilityOff}
          alt=""
          width={24}
          height={24}
          onClick={() => setIsVisible((prev) => !prev)}
        />
      )}

      {error && (
        <p id={errorId} className={fieldStyles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
