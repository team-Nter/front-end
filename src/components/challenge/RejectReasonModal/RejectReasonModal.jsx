'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/common/Modal';
import { Textarea } from '@/components/common/Textarea';
import { Button } from '@/components/common/Button';
import closeIcon from '@/assets/icons/out.svg';
import * as styles from './RejectReasonModal.css';

const MAX_LENGTH = 255;

export default function RejectReasonModal({ onClose, onSubmit, isSubmitting }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = reason.trim();

    if (!trimmed) {
      setError('거절 사유를 입력해주세요.');
      return;
    }

    onSubmit(trimmed);
  };

  return (
    <Modal
      className={styles.modal}
      aria-labelledby="reject-modal-title"
      onClose={handleClose}
    >
      <div className={styles.header}>
        <h2 id="reject-modal-title" className={styles.title}>
          거절 사유
        </h2>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="닫기"
          onClick={handleClose}
        >
          <Image src={closeIcon} alt="" />
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Textarea
          label="내용"
          placeholder="거절 사유를 입력해주세요"
          rows={6}
          maxLength={MAX_LENGTH}
          value={reason}
          onChange={(event) => {
            setReason(event.target.value);
            if (error) setError('');
          }}
          error={error}
          autoFocus
        />
        <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? '전송 중...' : '전송'}
        </Button>
      </form>
    </Modal>
  );
}