'use client';

import { EditWorkEditor } from '@/components/Editor/EditWorkEditor';
import { useSubmission } from '@/hooks/useSubmissions';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const { data: submission, isPending } = useSubmission(id);

  if (isPending) return <p>작성물을 불러오는 중이에요.</p>;

  return <EditWorkEditor submission={submission} />;
}
