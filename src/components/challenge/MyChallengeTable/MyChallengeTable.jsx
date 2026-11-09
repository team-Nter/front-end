'use client';

import Image from 'next/image';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { ChallengeChip } from '../ChallengeChip';
import searchIcon from '@/assets/icons/search.svg';
import plusIcon from '@/assets/icons/plus.svg';
import * as styles from './MyChallengeTable.css';
import { ChallengeRow } from '../ChallengeRow';
import {
  getOptionLabel,
  DOCUMENT_TYPE_OPTIONS,
  CHALLENGE_CATEGORY_OPTIONS,
  CHALLENGE_STATUS_OPTIONS,
  MY_CHALLENGE_TABS,
} from '@/constants/challenge';
import { ChallengeTab } from '../ChallengeTab';
import { Pagination } from '@/components/common/Pagination';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMyChallenges } from '@/hooks/useChallenges';
import { ChallengeCard } from '@/components/challenge/ChallengeCard';
import { useMe } from '@/hooks/useMe';
import arrowRightIcon from '@/assets/icons/arrow-right.svg';
import documentIcon from '@/assets/icons/document.svg';

function formatShortDate(value) {
  return new Date(value)
    .toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
    .slice(2)
    .replaceAll('-', '/');
}

const EMPTY_MESSAGES = {
  participating: '참여 중인 챌린지가 없어요.',
  completed: '완료한 챌린지가 없어요.',
  requested: '아직 신청한 챌린지가 없어요.',
};

export default function MyChallengeTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typeParam = searchParams.get('type');
  const type = MY_CHALLENGE_TABS.some((tab) => tab.value === typeParam)
    ? typeParam
    : 'participating';
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [prevType, setPrevType] = useState(type);

  const isRequested = type === 'requested';
  const { data: me, isPending: isMePending } = useMe();

  const handleTabChange = (nextType) => {
    router.replace(`${pathname}?type=${nextType}`, { scroll: false });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchInput.trim());
    setPage(1);
  };

  if (prevType !== type) {
    setPrevType(type);
    setPage(1);
    setSearchInput('');
    setKeyword('');
    setStatus('');
  }

  const { data, isPending, isError, error } = useMyChallenges({
    type,
    page,
    pageSize: 10,
    keyword: keyword || undefined,
    status: isRequested ? status || undefined : undefined,
  });

  const items = data?.items ?? [];
  const totalPages = data?.pagination?.totalPages ?? 0;

  const renderAction = (challenge) => {
    if (type === 'participating') {
      return (
        <Link
          href={`/challenges/${challenge.id}/work`}
          className={styles.continueButton}
        >
          도전 계속하기
          <Image src={arrowRightIcon} alt="" />
        </Link>
      );
    }
    if (type === 'completed' && me) {
      return (
        <Link
          href={`/challenges/${challenge.id}/participants/${me.id}/submission`}
          className={styles.mySubmissionButton}
        >
          내 작업물 보기
          <Image src={documentIcon} alt="" />
        </Link>
      );
    }
    return null;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>나의 챌린지</h1>
        <Button as={Link} href="/challenges/new" className={styles.newButton}>
          신규 챌린지 신청
          <Image src={plusIcon} alt="" />
        </Button>
      </div>

      <ChallengeTab type={type} onChange={handleTabChange} />

      <div className={styles.toolbar}>
        <form className={styles.search} onSubmit={handleSearch} role="search">
          <Image src={searchIcon} alt="" className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="챌린지 이름을 검색해보세요."
            aria-label="챌린지 이름을 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
        {isRequested && (
          <select
            className={styles.statusSelect}
            aria-label="상태 필터"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">전체 상태</option>
            {CHALLENGE_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {isMePending ? (
        <p className={styles.message}>불러오는 중...</p>
      ) : !me ? (
        <p className={styles.message}>
          로그인이 필요해요. <Link href="/login">로그인하기</Link>
        </p>
      ) : isPending ? (
        <p className={styles.message}>불러오는 중...</p>
      ) : isError ? (
        <p role="alert" className={styles.message}>
          {error.message}
        </p>
      ) : items.length === 0 ? (
        <p className={styles.message}>{EMPTY_MESSAGES[type]}</p>
      ) : isRequested ? (
        <div className={styles.tableScroll}>
          <ChallengeRow className={styles.header}>
            <div>No.</div>
            <div>분야</div>
            <div>문서 타입</div>
            <div>챌린지 제목</div>
            <div>모집 인원</div>
            <div>신청일</div>
            <div>마감 기한</div>
            <div>상태</div>
          </ChallengeRow>
          <ul className={styles.list}>
            {items.map((challenge) => (
              <ChallengeRow as="li" key={challenge.id} className={styles.item}>
                <div>{challenge.id}</div>
                <div>
                  {getOptionLabel(
                    CHALLENGE_CATEGORY_OPTIONS,
                    challenge.category,
                  )}
                </div>
                <div>
                  {getOptionLabel(
                    DOCUMENT_TYPE_OPTIONS,
                    challenge.documentType,
                  )}
                </div>
                <div>
                  <Link
                    href={`/my-challenges/${challenge.id}`}
                    className={styles.titleLink}
                  >
                    {challenge.title}
                  </Link>
                </div>
                <div>{challenge.maxParticipants}</div>
                <div>{formatShortDate(challenge.createdAt)}</div>
                <div>{formatShortDate(challenge.deadlineAt)}</div>
                <div>
                  <ChallengeChip kind="status" value={challenge.status} />
                </div>
              </ChallengeRow>
            ))}
          </ul>
        </div>
      ) : (
        <ul className={styles.cardList}>
          {items.map((challenge) => (
            <li key={challenge.id}>
              <ChallengeCard
                challenge={challenge}
                action={renderAction(challenge)}
              />
            </li>
          ))}
        </ul>
      )}
      {totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPage={totalPages}
          onPageChange={setPage}
          className={styles.pagination}
        />
      )}
    </div>
  );
}
