'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useMe } from '@/hooks/useMe';
import { useChallengeDetail } from '@/hooks/useChallengeDetail';
import { useJoinChallenge } from '@/hooks/useParticipation';
import { getChallengeAction } from '@/utils';
import { ChallengeParticipants } from '@/components/challenge/ChallengeParticipants';
import { BestSubmissions } from '@/components/challenge/BestSubmissions';
import { ChallengeAdminMenu } from '@/components/challenge/ChallengeAdminMenu';
import { ChallengeStatusBadge } from '@/components/challenge/ChallengeStatusBadge';
import { ChallengeSummary } from '@/components/challenge/ChallengeSummary';
import profileIcon from '@/assets/icons/profile-user.svg';
import * as styles from './ChallengeDetail.css';

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

function ChallengeAction({ challenge }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: me } = useMe();
  const {
    mutate: join,
    isPending: isJoining,
    error: joinError,
  } = useJoinChallenge(challenge.id);

  const action = getChallengeAction(challenge, me);
  const workHref = `/challenges/${challenge.id}/work`;

  const handleJoin = () => {
    join(undefined, { onSuccess: () => router.push(workHref) });
  };

  return (
    <div>
      <a href={challenge.sourceUrl} target="_blank" rel="noopener noreferrer">
        원문 보기
      </a>

      {action === 'viewSubmission' && (
        <Link
          href={`/challenges/${challenge.id}/participants/${me.id}/submission`}
        >
          내 작업물 보기
        </Link>
      )}
      {action === 'continue' && <Link href={workHref}>도전 계속하기</Link>}
      {(action === 'closed' || action === 'full') && (
        <button type="button" disabled>
          작업 도전하기
        </button>
      )}
      {action === 'login' && (
        <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
          작업 도전하기
        </Link>
      )}
      {action === 'join' && (
        <button type="button" onClick={handleJoin} disabled={isJoining}>
          {isJoining ? '참여중...' : '작업 도전하기'}
        </button>
      )}

      {joinError && <p role="alert">{joinError.message}</p>}
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
  const { data: me } = useMe();

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
    <section className={styles.page}>
      <div className={styles.top}>
        <div className={styles.info}>
          <ChallengeStatusBadge challenge={challenge} />
          <ChallengeSummary
            challenge={challenge}
            titleAction={
              me?.role === 'ADMIN' && (
                <ChallengeAdminMenu challengeId={challenge.id} />
              )
            }
          />
          <p className={styles.requestor}>
            <Image src={profileIcon} alt="" width={24} height={24} />
            {challenge.requestor?.nickname}
          </p>
        </div>

        <ChallengeAction challenge={challenge} />
      </div>

      <hr className={styles.divider} />

      <BestSubmissions submissions={challenge.bestSubmissions} />
      <ChallengeParticipants key={challenge.id} challengeId={challenge.id} />
    </section>
  );
}

export default function ChallengeDetail() {
  const { id } = useParams();

  if (!ID_PATTERN.test(id)) return <NotFound />;

  return <ChallengeDetailContent challengeId={id} />;
}
