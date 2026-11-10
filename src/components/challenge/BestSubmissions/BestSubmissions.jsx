'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';
import { SubmissionDetail } from '@/components/submission/SubmissionDetail/SubmissionDetail';
import { formatDate } from '@/utils';
import { getOptionLabel } from '@/constants/challenge';
import { USER_GRADE_OPTIONS } from '@/constants/user';
import medalIcon from '@/assets/icons/medal.svg';
import profileIcon from '@/assets/icons/profile-user.svg';
import heartIcon from '@/assets/icons/heart-white.svg';
import arrowDownIcon from '@/assets/icons/circle-arrow-down.svg';
import arrowUpIcon from '@/assets/icons/circle-arrow-up.svg';
import arrowRightIcon from '@/assets/icons/circle-arrow-right-filled.svg';
import * as styles from './BestSubmissions.css';

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
              <span className={styles.grade}>
                {getOptionLabel(USER_GRADE_OPTIONS, author.grade)}
              </span>
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

      <div className={styles.footer}>
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
      </div>
    </article>
  );
}

export default function BestSubmissions({ submissions }) {
  const listRef = useRef(null);
  const isCarousel = submissions.length > 1;
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(isCarousel);
  const [activeIndex, setActiveIndex] = useState(0);

  // 카드 한 칸 = 카드 폭 + 간격 (간격은 화면마다 달라서 CSS에서 읽어옴)
  const getStep = (list) => {
    const card = list.firstElementChild;
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  // 스크롤 위치로 ← → 버튼을 보일지 결정
  const updateArrows = () => {
    const list = listRef.current;
    if (!list) return;

    setCanPrev(list.scrollLeft > 1);
    setCanNext(list.scrollLeft + list.clientWidth < list.scrollWidth - 1);

    const step = getStep(list);
    if (step) setActiveIndex(Math.round(list.scrollLeft / step));
  };

  // 카드 한 칸만큼 이동
  const scrollByCard = (direction) => {
    const list = listRef.current;
    if (!list) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    list.scrollBy({
      left: direction * getStep(list),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  if (submissions.length === 0) return null;

  return (
    <section aria-label="최다 추천 번역" className={styles.carousel}>
      <ul ref={listRef} className={styles.list} onScroll={updateArrows}>
        {submissions.map((submission, index) => {
          const isInactive = isCarousel && index !== activeIndex;

          return (
            <li
              key={submission.id}
              className={clsx(
                styles.item,
                isCarousel && styles.itemPeek,
                isInactive && styles.itemInactive,
              )}
              inert={isInactive}
            >
              <BestSubmissionCard submission={submission} />
            </li>
          );
        })}
      </ul>

      {isCarousel && canPrev && (
        <button
          type="button"
          className={clsx(styles.arrow, styles.arrowPrev)}
          aria-label="이전 최다 추천 번역"
          onClick={() => scrollByCard(-1)}
        >
          <Image src={arrowRightIcon} alt="" className={styles.arrowIcon} />
        </button>
      )}
      {isCarousel && canNext && (
        <button
          type="button"
          className={clsx(styles.arrow, styles.arrowNext)}
          aria-label="다음 최다 추천 번역"
          onClick={() => scrollByCard(1)}
        >
          <Image src={arrowRightIcon} alt="" className={styles.arrowIcon} />
        </button>
      )}
    </section>
  );
}
