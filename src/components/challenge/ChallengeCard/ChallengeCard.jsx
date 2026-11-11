import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ChallengeChip } from '@/components/challenge/ChallengeChip';
import { ChallengeStatusBadge } from '@/components/challenge/ChallengeStatusBadge';
import deadlineIcon from '@/assets/icons/deadline-black.svg';
import personIcon from '@/assets/icons/person-gold.svg';
import * as styles from './ChallengeCard.css';

//'2024-03-03T14:59:59.000Z' → '2024년 3월 3일' (한국 시간 기준)
function formatDeadline(value) {
  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  });
}

export default function ChallengeCard({ challenge, action, menu, className }) {
  const {
    id,
    title,
    category,
    documentType,
    deadlineAt,
    maxParticipants,
    participations,
  } = challenge;

  const isFull = participations >= maxParticipants;

  return (
    <article className={clsx(styles.card, className)}>
      {menu && <div className={styles.menu}>{menu}</div>}
      <ChallengeStatusBadge challenge={challenge} />

      <h2 className={clsx(styles.title, menu && styles.titleWithMenu)}>
        <Link href={`/challenges/${id}`} className={styles.titleLink}>
          {title}
        </Link>
      </h2>

      <div className={styles.chips}>
        <ChallengeChip kind="category" value={category} />
        <ChallengeChip kind="documentType" value={documentType} />
      </div>

      <div className={styles.footer}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Image src={deadlineIcon} alt="" />
            {formatDeadline(deadlineAt)} 마감
          </span>
          <span className={styles.metaItem}>
            <Image src={personIcon} alt="" />
            {participations}/{maxParticipants}{' '}
            {isFull ? '참여 완료' : '참여 중'}
          </span>
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </article>
  );
}
