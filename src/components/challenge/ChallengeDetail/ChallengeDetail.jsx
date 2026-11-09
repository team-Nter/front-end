'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useChallengeDetail } from '@/hooks/useChallengeDetail';

const ID_PATTERN = /^[1-9]\d*$/;
const NOT_FOUND_STATUS = [400, 404];

function NotFound() {
  return (
    <div>
      <p>챌린지를 찾을 수 없어요.</p>
      <Link href="/challenges">챌린지 목록으로</Link>
    </div>
  );
}

function ChallengeDetailContent({ challengeId }) {
  const {
    data: challenge,
    isPending,
    isError,
    error,
    refetch,
  } = useChallengeDetail(challengeId);

  if (isPending) return <p>불러오는 중...</p>;

  if (isError) {
    if (NOT_FOUND_STATUS.includes(error.status)) return <NotFound />;

    return (
      <div role="alert">
        <p>{error.message}</p>
        <button type="button" onClick={() => refetch()}>
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <section>
      <h1>{challenge.title}</h1>
      <p>
        [{challenge.category} / {challenge.documentType}]
      </p>
      <p>{challenge.description}</p>
      <p>신청자: {challenge.requestor?.nickname}</p>
      <p>마감: {challenge.deadlineAt}</p>
      <p>
        인원: {challenge.participations}/{challenge.maxParticipants}
      </p>
      <a href={challenge.sourceUrl} target="_blank" rel="noopener noreferrer">
        원문 보기
      </a>

      {/* 확인용: 버튼 상태 작업(커밋 4) 때 지울 예정 */}
      <p>
        myParticipation: {JSON.stringify(challenge.myParticipation)} /
        mySubmissionId: {String(challenge.mySubmissionId)}
      </p>
    </section>
  );
}

export default function ChallengeDetail() {
  const { id } = useParams();

  if (!ID_PATTERN.test(id)) return <NotFound />;

  return <ChallengeDetailContent challengeId={id} />;
}
