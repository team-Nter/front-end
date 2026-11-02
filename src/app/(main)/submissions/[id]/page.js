'use client';

import { SubmissionDetail } from '@/components/Submission/SubmissionDetail/SubmissionDetail.jsx';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Page() {
  const { id } = useParams();

  return (
    <Suspense fallback={<p>작업물을 불러오는 중...</p>}>
      <SubmissionDetail submissionId={id} />
    </Suspense>
  );
}
