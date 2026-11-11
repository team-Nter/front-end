import clsx from 'clsx';
import Image from 'next/image';
import deadlineWhiteIcon from '@/assets/icons/deadline-white.svg';
import personWhiteIcon from '@/assets/icons/person-white.svg';
import * as styles from './ChallengeStatusBadge.css';

// 챌린지 상태 칩: 마감 → 검정 / 정원 참 → 회색 / 그 외 → 표시 안 함
// (챌린지 카드와 챌린지 상세가 함께 사용)
export default function ChallengeStatusBadge({ challenge }) {
  const { deadlineAt, participations, maxParticipants } = challenge;
  const isClosed = new Date(deadlineAt) <= new Date();
  const isFull = participations >= maxParticipants;

  if (isClosed) {
    return (
      <p className={clsx(styles.badge, styles.badgeClosed)}>
        <Image src={deadlineWhiteIcon} alt="" />
        챌린지가 마감되었어요
      </p>
    );
  }

  if (isFull) {
    return (
      <p className={styles.badge}>
        <Image src={personWhiteIcon} alt="" />
        모집이 완료된 상태에요
      </p>
    );
  }

  return null;
}
