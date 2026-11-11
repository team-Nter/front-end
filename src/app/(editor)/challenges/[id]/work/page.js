'use client';

import { CreateWorkEditor } from '@/components/editor/CreateWorkEditor';
import { useMe } from '@/hooks/useMe';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const { data: user, isPending, isError } = useMe();

  if (isPending) return <p>사용자 정보를 불러오는 중이에요.</p>;
  if (isError && !user)
    return <p role="alert">사용자 정보를 불러오지 못했어요.</p>;
  if (!user) return <p>로그인이 필요해요.</p>;

  return <CreateWorkEditor key={`${id}:${user.id}`} id={id} userId={user.id} />;
}
