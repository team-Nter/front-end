'use client';

import Image from 'next/image';
import FeedbackSection from '@/components/feedback/FeedbackSection';
import emptyImage from '@/assets/images/empty.svg';
import profileUser from '@/assets/icons/profile-user.svg';
import { formatDate } from '@/utils';
import { SubmissionDetail } from '../SubmissionDetail/SubmissionDetail';
import * as styles from '../SubmissionDetail/SubmissionDetail.css';

export function SubmissionView({
  participation,
  submission = null,
  challengeStatus,
}) {
  const author = submission?.author ?? participation.user;
  const likeCount = submission?.likeCount ?? 0;
  const updatedAt = submission?.updatedAt;
  const date = formatDate(updatedAt, '/');

  return (
    <article className={styles.article}>
      {submission && <h1 className={styles.title}>{submission.title}</h1>}
      <div className={styles.metadata}>
        <div className={styles.author}>
          <Image src={profileUser} alt="" width={24} height={24} />
          <span className={styles.nickname}>
            {author?.nickname ?? '알 수 없는 사용자'}
          </span>
        </div>
        <span className={styles.likes} aria-label={`좋아요 ${likeCount}개`}>
          <span className={styles.heart} aria-hidden="true">
            ♡
          </span>
          {likeCount.toLocaleString('ko-KR')}
        </span>
        {date && (
          <time className={styles.date} dateTime={updatedAt}>
            {date}
          </time>
        )}
      </div>
      {submission === null ? (
        <div className={styles.empty}>
          <Image
            src={emptyImage}
            alt=""
            className={styles.emptyImage}
            loading="eager"
          />
          <p>아직 작성하지 않았어요.</p>
        </div>
      ) : (
        <SubmissionDetail
          key={`submission:${submission.id}`}
          content={submission.content}
        />
      )}
      {submission && <hr className={styles.feedbackDivider} />}
      {submission && (
        <FeedbackSection
          key={`feedbacks:${submission.id}`}
          submissionId={submission.id}
          challengeStatus={challengeStatus}
        />
      )}
    </article>
  );
}
