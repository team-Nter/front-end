'use client';

import { useId } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import * as styles from './SubmissionDeleteModal.css';
import { submissionDeleteError } from '@/utils/SubmissionError/submissionDeleteError';

export default function SubmissionDeleteModal({
  isPending,
  error,
  onCancel,
  onConfirm,
}) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Modal
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-busy={isPending}
      onClose={isPending ? undefined : onCancel}
    >
      <h2 id={titleId} className={styles.title}>
        작성물을 삭제하시겠습니까?
      </h2>
      <p id={descriptionId} className={styles.description}>
        삭제한 작성물은 복구할 수 없어요.
      </p>
      {error && (
        <p role="alert" className={styles.error}>
          {submissionDeleteError(error)}
        </p>
      )}
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel} disabled={isPending}>
          취소
        </Button>
        <Button onClick={onConfirm} disabled={isPending}>
          {isPending ? '삭제 중…' : '삭제하기'}
        </Button>
      </div>
    </Modal>
  );
}
