'use client';

import { useState } from 'react';
import { useChallenges } from '@/hooks/useChallenges';
import { Pagination } from '@/components/common/Pagination';

export default function Page() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error } = useChallenges({ page });

  if (isPending) return <p>불러오는 중...</p>;
  if (isError) return <p>에러: {error.message}</p>;

  return (
    <>
      <h1>4 + 12 챌린지 목록 (홍균님)</h1>
      <ul>
        {data.items.map((challenge) => (
          <li key={challenge.id}>
            [{challenge.category}/{challenge.documentType}] {challenge.title} —{' '}
            {challenge.participations}/{challenge.maxParticipants}명
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={page}
        totalPage={data.pagination.totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
