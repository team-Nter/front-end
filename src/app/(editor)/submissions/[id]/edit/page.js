'use client';

import { EditWorkEditor } from '@/components/Editor/EditWorkEditor';
import { useSubmission } from '@/hooks/useSubmissions';
import { useParams } from 'next/navigation';
import { useMe } from '@/hooks/useMe';

export default function Page() {
  const { id } = useParams();
  const { data: submission, isPending } = useSubmission(id);
  const { data: user, isPending: isUserPending, isError } = useMe();

  if (isPending || isUserPending) return <p>작성물을 불러오는 중이에요.</p>;
  if (isError && !user)
    return <p role="alert">사용자 정보를 불러오지 못했어요.</p>;
  if (!user) return <p>로그인이 필요해요.</p>;

  return (
    <EditWorkEditor
      key={`${submission.id}:${user.id}`}
      submission={submission}
      userId={user.id}
    />
  );
}
