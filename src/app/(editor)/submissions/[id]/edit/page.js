'use client';

import { EditWorkEditor } from '@/components/Editor/EditWorkEditor';
import { useSubmission } from '@/hooks/useSubmissions';
import { useParams } from 'next/navigation';
import { useMe } from '@/hooks/useMe';
import Link from 'next/link';
import { QueryBoundary } from '@/components/common/QueryBoundary';
import { getSubmissionErrorMessage } from '@/utils/SubmissionError/submissionJoinError';

function SubmissionEditor({ id, user }) {
  const { data: submission } = useSubmission(id);
  const canEdit = submission.author?.id === user.id || user.role === 'ADMIN';

  if (!canEdit) {
    return (
      <div role="alert">
        <p>작성자 혹은 관리자만 수정이 가능합니다.</p>
        <Link href={`/challenges/${submission.challengeId}`}>
          챌린지로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <EditWorkEditor
      key={`${submission.id}:${user.id}`}
      submission={submission}
      userId={user.id}
    />
  );
}

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
      loadingFallback={<p>작업물을 불러오는 중이에요.</p>}
      errorFallback={({ error, retry }) => (
        <div role="alert">
          <p>{getSubmissionErrorMessage(error)}</p>
          {![400, 401, 403, 404].includes(error?.status) && (
            <button type="button" onClick={retry}>
              다시 시도
            </button>
          )}
          <Link href="/challenges">챌린지 목록으로 돌아가기</Link>
        </div>
      )}
    >
      <SubmissionEditor key={`${id}:${user.id}`} id={id} user={user} />
    </QueryBoundary>
  );
}
