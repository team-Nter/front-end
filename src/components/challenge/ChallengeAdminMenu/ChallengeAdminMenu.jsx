'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Popover } from '@/components/common/Popover';
import { Textarea } from '@/components/common/Textarea';
import { useModerateChallenge } from '@/hooks/useModerateChallenge';
import menuIcon from '@/assets/icons/menu.svg';

const REASON_MAX_LENGTH = 255;

export default function ChallengeAdminMenu({ challengeId }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const {
    mutate: moderate,
    isPending,
    error,
    reset,
  } = useModerateChallenge(challengeId);

  const openModal = (closeMenu) => {
    closeMenu();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isPending) return;

    setIsModalOpen(false);
    setReason('');
    reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    moderate(
      { action: 'CANCEL', reason: reason.trim() },
      { onSuccess: () => router.replace('/challenges') },
    );
  };

  return (
    <>
      <Popover
        align="right"
        trigger={
          <button type="button" aria-label="챌린지 관리 메뉴">
            <Image src={menuIcon} alt="" />
          </button>
        }
      >
        {({ close }) => (
          <button type="button" onClick={() => openModal(close)}>
            삭제하기
          </button>
        )}
      </Popover>

      {isModalOpen && (
        <Modal aria-labelledby="delete-reason-title" onClose={closeModal}>
          <form onSubmit={handleSubmit}>
            <h2 id="delete-reason-title">삭제 사유</h2>
            <Textarea
              label="내용"
              rows={7}
              placeholder="삭제 사유를 입력해주세요"
              maxLength={REASON_MAX_LENGTH}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              error={error?.message}
            />
            <Button
              variant="secondary"
              onClick={closeModal}
              disabled={isPending}
            >
              취소
            </Button>
            <Button type="submit" disabled={!reason.trim() || isPending}>
              {isPending ? '삭제 중...' : '전송'}
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
}
