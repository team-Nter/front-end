'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useParticipants } from '@/hooks/useParticipation';
import { getOptionLabel } from '@/constants/challenge';
import { USER_GRADE_OPTIONS } from '@/constants/user';
import crownIcon from '@/assets/icons/crown-gold.svg';
import heartIcon from '@/assets/icons/heart-gold.svg';
import profileIcon from '@/assets/icons/profile-user.svg';
import leftBlackIcon from '@/assets/icons/direction-left-black.svg';
import leftGrayIcon from '@/assets/icons/direction-left-gray.svg';
import rightBlackIcon from '@/assets/icons/direction-right-black.svg';
import rightGrayIcon from '@/assets/icons/direction-right-gray.svg';
import * as styles from './ChallengeParticipants.css';

const EMPTY_MESSAGE = '아직 참여한 도전자가 없어요,\n지금 바로 도전해보세요!';

// 순위 배지: 미제출자(rank null)는 빈 자리, 1위 + 좋아요 1개 이상이면 왕관
function RankBadge({ rank, likeCount }) {
  if (rank === null) return <span className={styles.rankSlot} />;

  const hasCrown = rank === 1 && likeCount > 0;

  return (
    <span className={styles.rankSlot}>
      <span className={styles.rank}>
        {hasCrown && <Image src={crownIcon} alt="" width={16} height={16} />}
        {String(rank).padStart(2, '0')}
      </span>
    </span>
  );
}

export default function ChallengeParticipants({ challengeId }) {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error, isPlaceholderData } =
    useParticipants(challengeId, page);

  if (isPending || isError) {
    return (
      <section className={styles.box}>
        <h2 className={styles.title}>참여 현황</h2>
        {isPending ? (
          <p className={styles.message}>참여 현황을 불러오는 중...</p>
        ) : (
          <p role="alert" className={styles.message}>
            {error.message}
          </p>
        )}
      </section>
    );
  }

  const { items, pagination } = data;
  const { totalPages } = pagination;
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <section className={styles.box}>
      <div className={styles.header}>
        <h2 className={styles.title}>참여 현황</h2>

        {totalPages > 1 && (
          <div className={styles.pager}>
            <span className={styles.pageCount}>
              <span className={styles.currentPage}>{page}</span> / {totalPages}
            </span>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="이전 페이지"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={isFirst || isPlaceholderData}
              >
                <Image
                  src={isFirst ? leftGrayIcon : leftBlackIcon}
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="다음 페이지"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isLast || isPlaceholderData}
              >
                <Image
                  src={isLast ? rightGrayIcon : rightBlackIcon}
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <p className={styles.message}>{EMPTY_MESSAGE}</p>
      ) : (
        <ul className={styles.list}>
          {items.map((participant) => (
            <li key={participant.id} className={styles.row}>
              <RankBadge
                rank={participant.rank}
                likeCount={participant.likeCount}
              />

              <div className={styles.user}>
                <Image src={profileIcon} alt="" width={24} height={24} />
                <div className={styles.userText}>
                  <span className={styles.nickname}>
                    {participant.user?.nickname ?? '탈퇴한 사용자'}
                  </span>
                  {participant.user && (
                    <span className={styles.grade}>
                      {getOptionLabel(
                        USER_GRADE_OPTIONS,
                        participant.user.grade,
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.side}>
                <span className={styles.likes}>
                  <Image src={heartIcon} alt="좋아요" width={16} height={16} />
                  {participant.likeCount.toLocaleString()}
                </span>
                {participant.user && participant.submissionId && (
                  <Link
                    href={`/challenges/${challengeId}/participants/${participant.user.id}/submission`}
                    className={styles.submissionLink}
                  >
                    작업물 보기
                    <Image src={rightBlackIcon} alt="" width={16} height={16} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
