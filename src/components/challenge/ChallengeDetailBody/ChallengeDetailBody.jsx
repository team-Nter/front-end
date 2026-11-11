import Image from 'next/image';
import { ChallengeSummary } from '@/components/challenge/ChallengeSummary';
import deadlineIcon from '@/assets/icons/deadline-black.svg';
import personIcon from '@/assets/icons/person-gold.svg';
import linkIcon from '@/assets/icons/arrow-up-right.svg';
import * as styles from './ChallengeDetailBody.css';

function formatDeadline(value) {
  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  });
}

export default function ChallengeDetailBody({ challenge, actions }) {
  const { deadlineAt, maxParticipants, sourceUrl } = challenge;

  return (
    <article className={styles.body}>
      <section className={styles.info}>
        <ChallengeSummary challenge={challenge} actions={actions} />

        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt>
              <Image src={deadlineIcon} alt="마감일" />
            </dt>
            <dd>{formatDeadline(deadlineAt)} 마감</dd>
          </div>
          <div className={styles.metaItem}>
            <dt>
              <Image src={personIcon} alt="최대 인원" />
            </dt>
            <dd>{maxParticipants}명</dd>
          </div>
        </dl>
      </section>

      <section className={styles.source}>
        <h2 className={styles.sourceTitle}>원문 링크</h2>
        <div className={styles.sourceBox}>
          <span className={styles.sourceUrl}>{sourceUrl}</span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceLink}
          >
            링크 열기
            <Image src={linkIcon} alt="" />
          </a>
        </div>
      </section>
    </article>
  );
}
