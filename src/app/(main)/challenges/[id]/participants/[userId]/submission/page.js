'use client';

import { getSubmissionErrorMessage } from '@/utils/SubmissionError/submissionJoinError';
import { QueryBoundary } from '@/components/common/QueryBoundary';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useParticipation } from '@/hooks/useParticipation';
import { useSubmission } from '@/hooks/useSubmissions';
import { SubmissionView } from '@/components/submission/SubmissionView/SubmissionView';
import { useChallengeDetail } from '@/hooks/useChallengeDetail';

function SubmittedWork({ participation, challengeId }) {
  const { id } = participation.submission;

  const { data: challenge, isPending, error } = useChallengeDetail(challengeId);
  const { data: submission } = useSubmission(id);
  if (error) throw error;
  if (isPending) return <p>챌린지 정보를 불러오는 중...</p>;
  return (
    <SubmissionView
      participation={participation}
      submission={submission}
      challengeStatus={challenge.status}
    />
  );
}

function ParticipantSubmission({ challengeId, userId }) {
  const { data: participation } = useParticipation(challengeId, userId);
  // 작업물이 없음
  if (participation.submission === null) {
    return <SubmissionView participation={participation} />;
  }

  //작업물 있음
  return (
    <SubmittedWork participation={participation} challengeId={challengeId} />
  );
}

export default function Page() {
  const { id: challengeId, userId } = useParams();
  return (
    <QueryBoundary
      resetKeys={[challengeId, userId]}
      loadingFallback={<p>작업물을 불러오는 중...</p>}
      errorFallback={({ error, retry }) => (
        <div role="alert">
          <p>{getSubmissionErrorMessage(error)}</p>
          {error?.status === 404 && (
            <Link
              href={`/challenges/${challengeId}`}
              style={{ textDecoration: 'underline' }}
            >
              챌린지로 돌아가기
            </Link>
          )}
          {![400, 401, 403, 404, 409].includes(error.status) && (
            <button type="button" onClick={retry}>
              다시 시도
            </button>
          )}
        </div>
      )}
    >
      <ParticipantSubmission
        key={`${challengeId}:${userId}`}
        challengeId={challengeId}
        userId={userId}
      />
    </QueryBoundary>
  );
}
