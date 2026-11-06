import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import confirmIcon from '@/assets/icons/draft-confirm.svg';
import * as styles from './DraftPopUp.css';

export default function DraftConfirmModal({
  question,
  cancelLabel = '취소',
  confirmLabel,
  busy,
  disabled = busy,
  error,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      className={styles.dialog}
      aria-labelledby="draft-question"
      onClose={busy ? undefined : onCancel}
    >
      <Image src={confirmIcon} alt="" width={24} height={24} />
      <h2 id="draft-question" className={styles.question}>
        {question}
      </h2>
      {error && <p role="alert">{error.message}</p>}
      <div className={styles.actions}>
        <Button
          variant="secondary"
          className={styles.choice}
          disabled={busy}
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          className={styles.choice}
          disabled={disabled}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
