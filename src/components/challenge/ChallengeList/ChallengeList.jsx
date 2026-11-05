'use client';

import { useChallengeListParams } from '@/hooks/useChallengeListParams';
import { useChallenges } from '@/hooks/useChallenges';
import { Pagination } from '@/components/common/Pagination';

export default function ChallengeList() {
  const { params, updateParams } = useChallengeListParams();
  const { data, isPending, isError, error } = useChallenges(params);

  if (isPending) return <p>불러오는 중...</p>;
  if (isError) return <p>에러: {error.message}</p>;

  return (
    <>
      <ul>
        {data.items.map((challenge) => (
          <li key={challenge.id}>
            [{challenge.category}/{challenge.documentType}] {challenge.title} -{' '}
            {challenge.participations}/{challenge.maxParticipants}명
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={params.page}
        totalPage={data.pagination.totalPages}
        onPageChange={(page) => updateParams({ page })}
      />
    </>
  );
}
