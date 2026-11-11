'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Textarea } from '@/components/common/Textarea';
import * as styles from './DeleteConfirmModal.css';

const REASON_MAX_LENGTH = 255;

export default function DeleteConfirmModal({
  title,
  description,
  isPending,
  error,
  getErrorMessage,
  requireReason = false,
  onCancel,
  onConfirm,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [reason, setReason] = useState('');
  const trimmedReason = reason.trim();
  const isConfirmDisabled = isPending || (requireReason && !trimmedReason);

  const handleConfirm = () => {
    if (isConfirmDisabled) return;
    onConfirm(requireReason ? trimmedReason : undefined);
  };

  return (
    <Modal
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-busy={isPending}
      onClose={isPending ? undefined : onCancel}
    >
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <p id={descriptionId} className={styles.description}>
        {description}
        {requireReason && (
          <>
            <br />
            삭제 사유는 작성자에게 알림으로 전달돼요.
          </>
        )}
      </p>
      {requireReason && (
        <div className={styles.reasonField}>
          <Textarea
            label="삭제 사유"
            rows={4}
            placeholder="삭제 사유를 입력해주세요"
            maxLength={REASON_MAX_LENGTH}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            disabled={isPending}
          />
        </div>
      )}
      {error && (
        <p role="alert" className={styles.error}>
          {getErrorMessage(error)}
        </p>
      )}
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel} disabled={isPending}>
          취소
        </Button>
        <Button onClick={handleConfirm} disabled={isConfirmDisabled}>
          {isPending ? '삭제 중…' : '삭제하기'}
        </Button>
      </div>
    </Modal>
  );
}
