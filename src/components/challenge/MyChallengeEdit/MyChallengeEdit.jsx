'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMe } from '@/hooks/useMe';
import {
  useMyChallengeDetail,
  useUpdateMyChallenge,
} from '@/hooks/useChallenges';
import { ChallengeForm } from '../ChallengeForm';
import * as styles from './MyChallengeEdit.css';

function toFormValues(challenge) {
  return {
    title: challenge.title,
    sourceUrl: challenge.sourceUrl,
    category: challenge.category,
    documentType: challenge.documentType,
    deadline: new Date(challenge.deadlineAt).toLocaleDateString('sv-SE', {
      timeZone: 'Asia/Seoul',
    }),
    maxParticipants: String(challenge.maxParticipants),
    description: challenge.description,
  };
}

export default function MyChallengeEdit({ challengeId }) {
  const router = useRouter();
  const { data: me, isPending: isMePending } = useMe();
  const {
    data: challenge,
    isPending,
    isError,
    error,
  } = useMyChallengeDetail(challengeId);
  const {
    mutate: update,
    isPending: isSaving,
    error: saveError,
    reset,
  } = useUpdateMyChallenge(challengeId);

  if (isMePending) {
    return <p className={styles.message}>불러오는 중...</p>;
  }

  if (!me) {
    return (
      <p className={styles.message}>
        로그인이 필요해요. <Link href="/login">로그인하기</Link>
      </p>
    );
  }

  if (isPending) {
    return <p className={styles.message}>불러오는 중...</p>;
  }

  if (isError) {
    return (
      <p role="alert" className={styles.message}>
        {error.message}
      </p>
    );
  }

  if (!challenge.canEdit) {
    return (
      <p className={styles.message}>
        승인 대기 중이거나 거절된 챌린지만 수정할 수 있어요.{' '}
        <Link href={`/my-challenges/${challengeId}`}>신청 상세로 돌아가기</Link>
      </p>
    );
  }

  const handleSubmit = (body) => {
    update(body, {
      onSuccess: () => router.replace(`/my-challenges/${challengeId}`),
    });
  };

  const isRejected = challenge.status === 'REJECTED';

  return (
    <ChallengeForm
      heading={isRejected ? '챌린지 수정 후 재신청' : '챌린지 수정'}
      submitLabel={isRejected ? '재신청하기' : '수정하기'}
      pendingLabel={isRejected ? '재신청 중...' : '수정 중...'}
      initialValues={toFormValues(challenge)}
      onSubmit={handleSubmit}
      isPending={isSaving}
      error={saveError}
      onErrorReset={reset}
    />
  );
}
