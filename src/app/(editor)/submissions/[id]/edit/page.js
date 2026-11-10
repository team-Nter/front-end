'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useMe } from '@/hooks/useMe';
import { getSubmission } from '@/api/submissions';
import { queryKeys } from '@/constants/query-keys';
import WorkEditor from '@/components/Editor/WorkEditor/WorkEditor';
import { useSubmission } from '@/hooks/useSubmissions';

export default function Page() {
  const { id } = useParams();
  const { data: user, isPending: isUserPending, error: userError } = useMe();

  const { data: submission, isPending, error, refetch } = useSubmission();

  if (isUserPending) return <p>사용자 정보를 불러오는 중...</p>;
  if (userError) return <p role="alert">사용자 정보를 불러오지 못했습니다.</p>;
  if (!user)
    return (
      <p>
        <Link href="/login">로그인</Link>이 필요합니다.
      </p>
    );
  if (error)
    return (
      <div role="alert">
        <p>{error.message || '작업물을 불러오지 못했습니다.'}</p>
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    );
  if (isPending) return <p>작업물을 불러오는 중...</p>;
  if (user.role !== 'ADMIN' && user.id !== submission.author?.id)
    return <p role="alert">본인의 작업물만 수정할 수 있습니다.</p>;
  return (
    <WorkEditor
      key={`${id}:${user.id}`}
      id={submission.challengeId}
      userId={user.id}
      submission={submission}
    />
  );
}
