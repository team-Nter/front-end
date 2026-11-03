'use client';

import { SubmissionDetail } from '@/components/Submission/SubmissionDetail/SubmissionDetail.jsx';
import { SubmissionError } from '@/components/Submission/SubmissionError';
import { QueryBoundary } from '@/components/common/QueryBoundary';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  return (
    <QueryBoundary
      resetKeys={[id]}
      loadingFallback={<p>작업물을 불러오는 중...</p>}
      errorFallback={(props) => <SubmissionError {...props} />}
    >
      <SubmissionDetail submissionId={id} />
    </QueryBoundary>
  );
}
