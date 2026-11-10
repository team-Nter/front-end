'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';
import { SubmissionDetail } from '@/components/submission/SubmissionDetail/SubmissionDetail';
import { formatDate } from '@/utils';
import medalIcon from '@/assets/icons/medal.svg';
import profileIcon from '@/assets/icons/profile-user.svg';
import heartIcon from '@/assets/icons/heart-white.svg';
import arrowDownIcon from '@/assets/icons/circle-arrow-down.svg';
import arrowUpIcon from '@/assets/icons/circle-arrow-up.svg';
import * as styles from './BestSubmissions.css';

const GRADE_LABEL = { EXPERT: '전문가', NORMAL: '일반' };

// '2024-01-18T07:38:00Z' → '24/01/18 16:38' (한국 시간)
function formatSubmittedAt(value) {
  const time = new Date(value).toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${formatDate(value, '/')} ${time}`;
}

function BestSubmissionCard({ submission }) {
  const { author, likeCount, submittedAt, content } = submission;
  const contentRef = useRef(null);
  const contentId = useId();
  const [isLong, setIsLong] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 안쪽 내용의 실제 높이가 접힌 높이를 넘는지 계속 확인
  useEffect(() => {
    const wrapper = contentRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver(() => {
      setIsLong(wrapper.scrollHeight > styles.COLLAPSED_HEIGHT);
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <article className={styles.card}>
      <p className={styles.tab}>
        <Image src={medalIcon} alt="" width={16} height={16} />
        최다 추천 번역
      </p>

      <div className={styles.meta}>
        <div className={styles.metaLeft}>
          <span className={styles.author}>
            <Image src={profileIcon} alt="" width={24} height={24} />
            <span className={styles.nickname}>
              {author?.nickname ?? '탈퇴한 사용자'}
            </span>
            {author && (
              <span className={styles.grade}>{GRADE_LABEL[author.grade]}</span>
            )}
          </span>
          <span className={styles.likes}>
            <Image src={heartIcon} alt="좋아요" width={24} height={24} />
            {likeCount.toLocaleString()}
          </span>
        </div>
        <time className={styles.date} dateTime={submittedAt}>
          {formatSubmittedAt(submittedAt)}
        </time>
      </div>

      <div
        id={contentId}
        ref={contentRef}
        className={clsx(styles.content, !isExpanded && styles.collapsed)}
      >
        <SubmissionDetail content={content} />
      </div>

      {isLong && (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? '접기' : '더보기'}
          <Image
            src={isExpanded ? arrowUpIcon : arrowDownIcon}
            alt=""
            width={24}
            height={24}
          />
        </button>
      )}
    </article>
  );
}

export default function BestSubmissions({ submissions }) {
  if (submissions.length === 0) return null;

  return (
    <section aria-label="최다 추천 번역">
      <ul className={styles.list}>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <BestSubmissionCard submission={submission} />
          </li>
        ))}
      </ul>
    </section>
  );
}
