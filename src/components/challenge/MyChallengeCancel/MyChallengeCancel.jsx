'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { useCancelMyChallenge } from '@/hooks/useChallenges';

export default function MyChallengeCancel({ challengeId }) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutate: cancel, isPending, error, reset } = useCancelMyChallenge();

  const closeConfirm = () => {
    if (isPending) return;
    setIsConfirmOpen(false);
    reset();
  };

  const handleConfirm = () => {
    cancel(challengeId, {
      onSuccess: () => router.replace('/my-challenges?type=requested'),
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setIsConfirmOpen(true)}>
        취소하기
      </Button>

      {isConfirmOpen && (
        <ConfirmModal
          question="정말 취소하시겠어요?"
          cancelLabel="아니오"
          confirmLabel={isPending ? '취소 중…' : '네'}
          busy={isPending}
          errorMessage={error?.message}
          onCancel={closeConfirm}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
