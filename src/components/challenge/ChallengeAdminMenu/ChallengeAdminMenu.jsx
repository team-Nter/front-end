'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Popover } from '@/components/common/Popover';
import { Textarea } from '@/components/common/Textarea';
import { useModerateChallenge } from '@/hooks/useChallenges';
import menuIcon from '@/assets/icons/menu.svg';
import closeIcon from '@/assets/icons/out.svg';
import * as styles from './ChallengeAdminMenu.css.js';

const REASON_MAX_LENGTH = 255;

export default function ChallengeAdminMenu({ challengeId, onDeleted }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const {
    mutate: moderate,
    isPending,
    isSuccess,
    error,
    reset,
  } = useModerateChallenge();

  const openModal = (closeMenu) => {
    closeMenu();
    setIsModalOpen(true);
  };

  // 모달을 닫고 입력값 · 삭제 요청 상태를 비웁니다.
  const resetModal = () => {
    setIsModalOpen(false);
    setReason('');
    reset();
  };

  // 삭제 중에는 닫지 않습니다.
  const closeModal = () => {
    if (isPending) return;

    resetModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    moderate(
      { challengeId, action: 'CANCEL', reason: reason.trim() },
      {
        onSuccess: () => {
          // 상세 화면: 다른 페이지로 이동할 때까지 모달을 유지합니다.
          if (onDeleted) {
            onDeleted();
            return;
          }

          // 목록 화면: 재조회가 실패해 카드가 남아도 모달은 닫습니다.
          resetModal();
        },
      },
    );
  };
  return (
    <>
      <Popover
        align="right"
        className={styles.panel}
        trigger={
          <button
            type="button"
            className={styles.trigger}
            aria-label="챌린지 관리 메뉴"
          >
            <Image src={menuIcon} alt="" width={24} height={24} />
          </button>
        }
      >
        {({ close }) => (
          <button
            type="button"
            className={styles.item}
            onClick={() => openModal(close)}
          >
            삭제하기
          </button>
        )}
      </Popover>

      {isModalOpen && (
        <Modal aria-labelledby="delete-reason-title" onClose={closeModal}>
          <div className={styles.modalHeader}>
            <h2 id="delete-reason-title" className={styles.modalTitle}>
              삭제 사유
            </h2>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="닫기"
              onClick={closeModal}
              disabled={isPending}
            >
              <Image src={closeIcon} alt="" width={24} height={24} />
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <Textarea
              label="내용"
              rows={7}
              labelClassName={styles.reasonLabel}
              placeholder="삭제 사유를 입력해주세요"
              maxLength={REASON_MAX_LENGTH}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              error={error?.message}
            />
            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={!reason.trim() || isPending || isSuccess}
            >
              {isPending || isSuccess ? '삭제 중...' : '전송'}
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
}
