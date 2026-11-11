'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { useMe } from '@/hooks/useMe';
import {
  useAdminChallengeDetail,
  useModerateChallenge,
} from '@/hooks/useChallenges';
import { ChallengeDetailBody } from '../ChallengeDetailBody';
import { ChallengeModerationNotice } from '../ChallengeModerationNotice';
import { RejectReasonModal } from '../RejectReasonModal';
import leftBlackIcon from '@/assets/icons/direction-left-black.svg';
import leftGrayIcon from '@/assets/icons/direction-left-gray.svg';
import rightBlackIcon from '@/assets/icons/direction-right-black.svg';
import rightGrayIcon from '@/assets/icons/direction-right-gray.svg';
import * as styles from './AdminChallengeDetail.css';

function toQueryString({ status, sort, keyword }) {
  const query = new URLSearchParams();
  if (status.length) query.set('status', status.join(','));
  if (sort) query.set('sort', sort);
  if (keyword) query.set('keyword', keyword);
  const text = query.toString();
  return text ? `?${text}` : '';
}

function NavArrow({ targetId, queryString, label, activeIcon, inactiveIcon }) {
  if (!targetId) {
    return (
      <span className={styles.navArrow} aria-disabled="true" aria-label={label}>
        <Image src={inactiveIcon} alt="" />
      </span>
    );
  }

  return (
    <Link
      href={`/admin/challenges/${targetId}${queryString}`}
      className={styles.navArrow}
      aria-label={label}
    >
      <Image src={activeIcon} alt="" />
    </Link>
  );
}

export default function AdminChallengeDetail({ challengeId, filters }) {
  const { data: me, isPending: isMePending } = useMe();
  const {
    data: challenge,
    isPending,
    isError,
    error,
  } = useAdminChallengeDetail(challengeId, filters);

  const moderate = useModerateChallenge();
  const [savedAdjacent, setSavedAdjacent] = useState(null);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

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

  if (me.role !== 'ADMIN') {
    return <p className={styles.message}>관리자만 볼 수 있는 페이지예요.</p>;
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

  const prevId = challenge.prevId ?? savedAdjacent?.prevId ?? null;
  const nextId = challenge.nextId ?? savedAdjacent?.nextId ?? null;
  const queryString = toQueryString(filters);
  const isPendingStatus = challenge.status === 'PENDING';

  const handleModerate = (action, reason, options) => {
    setSavedAdjacent({ prevId: challenge.prevId, nextId: challenge.nextId });
    moderate.mutate(
      { challengeId: challenge.id, action, reason },
      {
        ...options,
        onError: (err) => alert(err.message),
      },
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navRow}>
        <span className={styles.number}>No. {challenge.id}</span>
        <nav className={styles.nav} aria-label="신청 이동">
          <NavArrow
            targetId={prevId}
            queryString={queryString}
            label="이전 신청"
            activeIcon={leftBlackIcon}
            inactiveIcon={leftGrayIcon}
          />
          <NavArrow
            targetId={nextId}
            queryString={queryString}
            label="다음 신청"
            activeIcon={rightBlackIcon}
            inactiveIcon={rightGrayIcon}
          />
        </nav>
      </div>

      <ChallengeModerationNotice
        status={challenge.status}
        moderation={challenge.moderation}
      />

      <ChallengeDetailBody challenge={challenge} />

      {isPendingStatus && (
        <div className={styles.actions}>
          <Button
            size="lg"
            className={styles.actionButton}
            disabled={moderate.isPending}
            onClick={() => handleModerate('APPROVE')}
          >
            승인하기
          </Button>
          <Button
            size="lg"
            className={styles.rejectButton}
            disabled={moderate.isPending}
            onClick={() => setIsRejectOpen(true)}
          >
            거절하기
          </Button>
        </div>
      )}
      {isRejectOpen && (
        <RejectReasonModal
          isSubmitting={moderate.isPending}
          onClose={() => setIsRejectOpen(false)}
          onSubmit={(reason) =>
            handleModerate('REJECT', reason, {
              onSuccess: () => setIsRejectOpen(false),
            })
          }
        />
      )}
    </div>
  );
}
