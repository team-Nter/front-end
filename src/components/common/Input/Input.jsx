import clsx from 'clsx';
import * as styles from './Input.css.js';
import { useId } from 'react';
import * as fieldStyles from '../TextField.css.js';

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

  return (
    <div className={fieldStyles.field}>
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
        type={type}
        className={clsx(styles.input, className)}
        aria-invalid={error ? true : (ariaInvalid ?? false)}
        aria-describedby={descriptionIds}
      />
      {error && (
        <p id={errorId} className={fieldStyles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
