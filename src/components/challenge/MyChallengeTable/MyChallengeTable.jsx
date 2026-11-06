'use client';

import Image from 'next/image';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import pendingChip from '@/assets/icons/chip-status-pending.svg';
import approvedChip from '@/assets/icons/chip-status-fulfilled.svg';
import rejectedChip from '@/assets/icons/chip-status-rejected.svg';
import canceledChip from '@/assets/icons/chip-status-delete.svg';
import searchIcon from '@/assets/icons/search.svg';
import plusIcon from '@/assets/icons/plus.svg';
import * as styles from './MyChallengeTable.css';
import { ChallengeRow } from '../ChallengeRow';
import {
  getOptionLabel,
  DOCUMENT_TYPE_OPTIONS,
  CHALLENGE_CATEGORY_OPTIONS,
  CHALLENGE_STATUS_OPTIONS,
} from '@/constants/challenge';
import ChallengeTab from '../ChallengeTab/ChallengeTab';
import { Pagination } from '@/components/common/Pagination';
import { useState } from 'react';
import { useMyChallenges } from '@/hooks/useChallenges';

const STATUS_CHIPS = {
  PENDING: pendingChip,
  APPROVED: approvedChip,
  REJECTED: rejectedChip,
  CANCELED: canceledChip,
};

function formatShortDate(value) {
  return new Date(value)
    .toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
    .slice(2)
    .replaceAll('-', '/');
}

export default function MyChallengeTable() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');

  const { data, isPending, isError, error } = useMyChallenges({
    type: 'requested',
    page,
    pageSize: 10,
    keyword: keyword.trim() || undefined,
    status: status || undefined,
  });

  const items = data?.items ?? [];
  const totalPages = data?.pagination.totalPages ?? 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>나의 챌린지</h1>
        <Button as={Link} href="/challenges/new" className={styles.newButton}>
          신규 챌린지 신청<Image src={plusIcon} alt="" />
        </Button>
      </div>

      <ChallengeTab type="requested" onChange={() => {}} />

      <div className={styles.toolbar}>
        <label className={styles.search}>
          <Image src={searchIcon} alt="" className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="챌린지 이름을 검색해보세요."
            aria-label="챌린지 이름을 검색"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
          />
        </label>
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
      </div>

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
        {isPending ? (
          <p className={styles.message}>불러오는 중...</p>
        ) : isError ? (
          <p role="alert" className={styles.message}>
            {error.message}
          </p>
        ) : items.length === 0 ? (
          <p className={styles.message}>아직 신청한 챌린지가 없어요.</p>
        ) : (
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
                  {' '}
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
                  <Image
                    src={STATUS_CHIPS[challenge.status]}
                    alt={getOptionLabel(
                      CHALLENGE_STATUS_OPTIONS,
                      challenge.status,
                    )}
                  />
                </div>
              </ChallengeRow>
            ))}
          </ul>
        )}
      </div>
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
