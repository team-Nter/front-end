'use client';

import { SubmissionView } from '@/components/Submission/SubmissionView';
import { SubmissionError } from '@/components/Submission/SubmissionError';
import { QueryBoundary } from '@/components/common/QueryBoundary';
import { useParams } from 'next/navigation';
import { useParticipation } from '@/hooks/useParticipation';
import { useSubmission } from '@/hooks/useSubmissions';

function SubmittedWork({ participation }) {
  const { id } = participation.submission;

  const { data: submission } = useSubmission(id);
  return (
    <SubmissionView participation={participation} submission={submission} />
  );
}

function ParticipantSubmission({ challengeId, userId }) {
  const { data: participation } = useParticipation(challengeId, userId);
  // 작업물이 없음
  if (participation.submission === null) {
    return <SubmissionView participation={participation} />;
  }

  //작업물 있음
  return <SubmittedWork participation={participation} />;
}

export default function Page() {
  const { id: challengeId, userId } = useParams();
  return (
    <QueryBoundary
      resetKeys={[challengeId, userId]}
      loadingFallback={<p>작업물을 불러오는 중...</p>}
      errorFallback={(props) => <SubmissionError {...props} />}
    >
      <ParticipantSubmission
        key={`${challengeId}:${userId}`}
        challengeId={challengeId}
        userId={userId}
      />
    </QueryBoundary>
  );
}
