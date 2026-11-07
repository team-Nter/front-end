'use client';

import { QueryBoundary } from '@/components/common/QueryBoundary';
import WorkEditor from '@/components/Editor/WorkEditor/WorkEditor';
import { useMe } from '@/hooks/useMe';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const { data: user, isPending, isError } = useMe();

  if (isPending) return <p>사용자 정보를 불러오는 중이에요.</p>;
  if (isError && !user)
    return <p role="alert">사용자 정보를 불러오지 못했어요.</p>;
  if (!user) return <p>로그인이 필요해요.</p>;

  return (
    <QueryBoundary
      resetKeys={[id, user.id]}
      loadingFallback={<p>임시저장한 글을 확인하는 중이에요.</p>}
      errorFallback={({ retry }) => (
        <div role="alert">
          <p>임시저장한 글을 조회하지 못했어요.</p>
          <button type="button" onClick={retry}>
            다시 시도
          </button>
        </div>
      )}
    >
      <WorkEditor key={`${id}:${user.id}`} id={id} userId={user.id} />
    </QueryBoundary>
  );
}
