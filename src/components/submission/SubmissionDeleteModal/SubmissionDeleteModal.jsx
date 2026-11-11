'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Textarea } from '@/components/common/Textarea';
import * as styles from './SubmissionDeleteModal.css';
import { submissionDeleteError } from '@/utils/SubmissionError/submissionDeleteError';

// 백엔드 deleteSubmissionSchema와 동일하게 유지
const REASON_MAX_LENGTH = 255;

export default function SubmissionDeleteModal({
  isPending,
  error,
  requireReason = false, // userRole 을 통해 모달 내의 삭제 내용이 필요한지 아닌지.
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
        작성물을 삭제하시겠습니까?
      </h2>
      <p id={descriptionId} className={styles.description}>
        {requireReason
          ? '삭제 사유는 작성자에게 알림으로 전달돼요.'
          : '삭제한 작성물은 복구할 수 없어요.'}
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
          {submissionDeleteError(error)}
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
