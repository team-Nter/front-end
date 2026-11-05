'use client';

import { useState } from 'react';
import { useChallengeListParams } from '@/hooks/useChallengeListParams';
import { useChallenges } from '@/hooks/useChallenges';
import { Pagination } from '@/components/common/Pagination';
import { Popover } from '@/components/common/Popover';
import { ChallengeFilter } from '@/components/challenge/ChallengeFilter';

export default function ChallengeList() {
  const { params, updateParams } = useChallengeListParams();
  const { data, isPending, isError, error } = useChallenges(params);
  const [keyword, setKeyword] = useState(params.keyword ?? '');

  const handleSearch = (event) => {
    event.preventDefault();
    updateParams({ keyword: keyword.trim() });
  };

  return (
    <>
      <Popover trigger={<button type="button">필터</button>}>
        {({ close }) => (
          <ChallengeFilter
            params={params}
            onApply={(filters) => {
              updateParams(filters);
              close();
            }}
            onClose={close}
          />
        )}
      </Popover>
      <form onSubmit={handleSearch}>
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="챌린지 이름을 검색해보세요."
        />
        <button type="submit">검색</button>
      </form>

      {isPending && <p>불러오는 중...</p>}
      {isError && <p>에러: {error.message}</p>}
      {data && data.items.length === 0 && <p>아직 챌린지가 없어요.</p>}

      {data && data.items.length > 0 && (
        <>
          <ul>
            {data.items.map((challenge) => (
              <li key={challenge.id}>
                [{challenge.category}/{challenge.documentType}]{' '}
                {challenge.title} - {challenge.participations}/
                {challenge.maxParticipants}명
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={params.page}
            totalPage={data.pagination.totalPages}
            onPageChange={(page) => updateParams({ page })}
          />
        </>
      )}
    </>
  );
}
