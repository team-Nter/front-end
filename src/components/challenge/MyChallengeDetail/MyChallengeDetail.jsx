'use client';

import Link from 'next/link';
import { useMe } from '@/hooks/useMe';
import { useMyChallengeDetail } from '@/hooks/useChallenges';
import { ChallengeDetailBody } from '../ChallengeDetailBody';
import { ChallengeModerationNotice } from '../ChallengeModerationNotice';
import { MyChallengeCancel } from '../MyChallengeCancel';
import { Button } from '@/components/common/Button';
import * as styles from './MyChallengeDetail.css';

export default function MyChallengeDetail({ challengeId }) {
  const { data: me, isPending: isMePending } = useMe();
  const {
    data: challenge,
    isPending,
    isError,
    error,
  } = useMyChallengeDetail(challengeId);

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

  return (
    <div className={styles.wrapper}>
      <ChallengeModerationNotice
        status={challenge.status}
        moderation={challenge.moderation}
        audience="requester"
      />
      <ChallengeDetailBody
        challenge={challenge}
        actions={
          (challenge.canEdit || challenge.canCancel) && (
            <>
              {challenge.canEdit && (
                <Button
                  as={Link}
                  href={`/my-challenges/${challenge.id}/edit`}
                  variant="secondary"
                >
                  수정하기
                </Button>
              )}
              {challenge.canCancel && (
                <MyChallengeCancel challengeId={challenge.id} />
              )}
            </>
          )
        }
      />
    </div>
  );
}
