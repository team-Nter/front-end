import { useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import confirmIcon from '@/assets/icons/draft-confirm.svg';
import * as styles from './ConfirmModal.css';

export default function ConfirmModal({
  question,
  cancelLabel = '취소',
  confirmLabel,
  busy,
  disabled = busy,
  errorMessage,
  recoveryHref,
  recoveryLabel,
  onCancel,
  onConfirm,
}) {
  const questionId = useId();

  return (
    <Modal
      className={styles.dialog}
      aria-labelledby={questionId}
      onClose={busy ? undefined : onCancel}
    >
      <Image src={confirmIcon} alt="" width={24} height={24} />
      <h2 id={questionId} className={styles.question}>
        {question}
      </h2>
      {errorMessage && <p role="alert">{errorMessage}</p>}
      <div className={styles.actions}>
        <Button
          variant="secondary"
          className={styles.choice}
          disabled={busy}
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        {recoveryHref ? (
          <Link href={recoveryHref} className={styles.recoveryLink}>
            {recoveryLabel}
          </Link>
        ) : (
          <Button
            className={styles.choice}
            disabled={disabled}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        )}
      </div>
    </Modal>
  );
}
