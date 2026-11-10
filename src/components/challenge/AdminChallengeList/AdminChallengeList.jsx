'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover } from '@/components/common/Popover';
import { Pagination } from '@/components/common/Pagination';
import { ChallengeRow } from '../ChallengeRow';
import { ChallengeChip } from '../ChallengeChip';
import { AdminChallengeFilter } from '../AdminChallengeFilter';
import { useAdminChallenges } from '@/hooks/useChallenges';
import {
  getOptionLabel,
  ADMIN_DEFAULT_SORT,
  CHALLENGE_CATEGORY_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
} from '@/constants/challenge';
import { useMe } from '@/hooks/useMe';
import searchIcon from '@/assets/icons/search.svg';
import filterActiveIcon from '@/assets/icons/filter-active.svg';
import filterInactiveIcon from '@/assets/icons/filter-inactive.svg';
import * as styles from './AdminChallengeList.css';

function formatShortDate(value) {
  return new Date(value)
    .toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
    .slice(2)
    .replaceAll('-', '/');
}

export default function AdminChallengeList() {
  const [status, setStatus] = useState([]);
  const [sort, setSort] = useState(ADMIN_DEFAULT_SORT);
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  const trimmedKeyword = keyword || undefined;
  const isSortChanged = sort !== ADMIN_DEFAULT_SORT;
  const hasFilter = status.length > 0 || isSortChanged;
  const { data: me, isPending: isMePending } = useMe();

  const { data, isPending, isError, error } = useAdminChallenges({
    status,
    sort,
    page,
    pageSize: 10,
    keyword: trimmedKeyword,
  });

  const items = data?.items ?? [];
  const totalPages = data?.pagination?.totalPages ?? 0;

  const detailQuery = new URLSearchParams();
  if (status.length) detailQuery.set('status', status.join(','));
  if (sort) detailQuery.set('sort', sort);
  if (trimmedKeyword) detailQuery.set('keyword', trimmedKeyword);
  const queryString = detailQuery.toString();

  const handleApply = (next) => {
    setStatus(next.status);
    setSort(next.sort);
    setPage(1);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchInput.trim());
    setPage(1);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>챌린지 신청 관리</h1>
      <div className={styles.toolbar}>
        <Popover
          className={styles.filterPanel}
          trigger={
            <button type="button" className={styles.filterButton}>
              필터{status.length > 0 && `(${status.length})`}
              <Image
                src={hasFilter ? filterActiveIcon : filterInactiveIcon}
                alt=""
              />
            </button>
          }
        >
          {({ close }) => (
            <AdminChallengeFilter
              value={{ status, sort }}
              onApply={(next) => {
                handleApply(next);
                close();
              }}
              onReset={handleApply}
              onClose={close}
            />
          )}
        </Popover>

        <form className={styles.search} onSubmit={handleSearch} role="search">
          <Image src={searchIcon} alt="" className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="챌린지 이름을 검색해보세요"
            aria-label="챌린지 이름 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </div>

      {isMePending ? (
        <p className={styles.message}>불러오는 중...</p>
      ) : !me ? (
        <p className={styles.message}>
          로그인이 필요해요. <Link href="/login">로그인하기</Link>
        </p>
      ) : me.role !== 'ADMIN' ? (
        <p className={styles.message}>관리자만 볼 수 있는 페이지예요.</p>
      ) : isPending ? (
        <p className={styles.message}>불러오는 중...</p>
      ) : isError ? (
        <p role="alert" className={styles.message}>
          {error.message}
        </p>
      ) : items.length === 0 ? (
        <p className={styles.message}>조건에 맞는 신청이 없어요.</p>
      ) : (
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
              <ChallengeRow
                as="li"
                key={challenge.id}
                className={styles.item}
                data-status={challenge.status}
              >
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
                    href={`/admin/challenges/${challenge.id}${queryString ? `?${queryString}` : ''}`}
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
