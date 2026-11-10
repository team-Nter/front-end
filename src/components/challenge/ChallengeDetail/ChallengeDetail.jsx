'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useMe } from '@/hooks/useMe';
import { useChallengeDetail } from '@/hooks/useChallengeDetail';
import { useJoinChallenge } from '@/hooks/useParticipation';
import { getChallengeAction } from '@/utils';
import { ChallengeParticipants } from '@/components/challenge/ChallengeParticipants';
import { BestSubmissions } from '@/components/challenge/BestSubmissions';
import { ChallengeAdminMenu } from '@/components/challenge/ChallengeAdminMenu';
import { ChallengeStatusBadge } from '@/components/challenge/ChallengeStatusBadge';
import { ChallengeSummary } from '@/components/challenge/ChallengeSummary';
import deadlineIcon from '@/assets/icons/deadline-black.svg';
import personIcon from '@/assets/icons/person-gold.svg';
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

// '2024-02-28T14:59:59.000Z' → '2024년 2월 28일' (한국 시간 기준)
function formatDeadline(value) {
  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  });
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

  // 'loading'(내 정보 확인 중)과 'admin'은 도전 버튼을 일부러 그리지 않아요.
  // 확인 전에 버튼을 그리면 어드민에게 "작업 도전하기"가 잠깐 보였다 사라지기 때문이에요.
  const action = getChallengeAction(challenge, me);
  const workHref = `/challenges/${challenge.id}/work`;

  const handleJoin = () => {
    join(undefined, { onSuccess: () => router.push(workHref) });
  };

  const buttonClass = clsx(styles.actionButton, styles.actionVariant.primary);

  return (
    <aside className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Image src={deadlineIcon} alt="" width={24} height={24} />
          {formatDeadline(challenge.deadlineAt)} 마감
        </span>
        <span className={styles.metaItem}>
          <Image src={personIcon} alt="" width={24} height={24} />
          {challenge.participations}/{challenge.maxParticipants}
        </span>
      </div>

      <div className={styles.buttons}>
        <a
          href={challenge.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(styles.actionButton, styles.actionVariant.source)}
        >
          원문 보기
        </a>

        {action === 'viewSubmission' && (
          <Link
            href={`/challenges/${challenge.id}/participants/${me.id}/submission`}
            className={buttonClass}
          >
            내 작업물 보기
          </Link>
        )}
        {action === 'continue' && (
          <Link href={workHref} className={buttonClass}>
            도전 계속하기
          </Link>
        )}
        {(action === 'closed' || action === 'full') && (
          <button type="button" disabled className={buttonClass}>
            작업 도전하기
          </button>
        )}
        {action === 'login' && (
          <Link
            href={`/login?redirect=${encodeURIComponent(pathname)}`}
            className={buttonClass}
          >
            작업 도전하기
          </Link>
        )}
        {action === 'join' && (
          <button
            type="button"
            onClick={handleJoin}
            disabled={isJoining}
            className={buttonClass}
          >
            {isJoining ? '참여중...' : '작업 도전하기'}
          </button>
        )}
      </div>

      {joinError && (
        <p role="alert" className={styles.error}>
          {joinError.message}
        </p>
      )}
    </aside>
  );
}

function ChallengeDetailContent({ challengeId }) {
  const router = useRouter();
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
      <div className={styles.header}>
        <ChallengeStatusBadge challenge={challenge} />

        <div className={styles.top}>
          <div className={styles.info}>
            <ChallengeSummary
              challenge={challenge}
              titleAction={
                me?.role === 'ADMIN' && (
                  <ChallengeAdminMenu
                    challengeId={challenge.id}
                    onDeleted={() => router.replace('/challenges')}
                  />
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
