import clsx from 'clsx';
import * as styles from './Textarea.css.js';
import { useId } from 'react';
import * as fieldStyles from '../TextField.css.js';

export default function Textarea({
  id,
  label,
  labelClassName,
  error,
  rows = 4,
  className,
  ...restProps
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${generatedId}-error`;

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
      <textarea
        id={inputId}
        rows={rows}
        className={clsx(styles.textarea, className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...restProps}
      />
      {error && (
        <p id={errorId} className={fieldStyles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
