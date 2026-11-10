'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParticipants } from '@/hooks/useParticipation';

export default function ChallengeParticipants({ challengeId }) {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error, isPlaceholderData } =
    useParticipants(challengeId, page);

  if (isPending) return <p>참여 현황을 불러오는 중...</p>;
  if (isError) return <p role="alert">{error.message}</p>;

  const { items, pagination } = data;
  const { totalPages, pageSize, page: dataPage } = pagination;

  return (
    <section>
      <h2>참여 현황</h2>

      {totalPages > 1 && (
        <div>
          <span>
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1 || isPlaceholderData}
          >
            이전
          </button>
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages || isPlaceholderData}
          >
            다음
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <p>아직 참여한 사람이 없어요.</p>
      ) : (
        <ol>
          {items.map((participant, index) => (
            <li key={participant.id}>
              {(dataPage - 1) * pageSize + index + 1}.{' '}
              {participant.user?.nickname ?? '탈퇴한 사용자'} - 좋아요{' '}
              {participant.likeCount}{' '}
              {participant.user && (
                <Link
                  href={`/challenges/${challengeId}/participants/${participant.user.id}/submission`}
                >
                  작업물 보기
                </Link>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
