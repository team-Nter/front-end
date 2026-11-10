'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { useChallengeListParams } from '@/hooks/useChallengeListParams';
import { useChallenges } from '@/hooks/useChallenges';
import { Pagination } from '@/components/common/Pagination';
import { Popover } from '@/components/common/Popover';
import { Button } from '@/components/common/Button';
import { ChallengeFilter } from '@/components/challenge/ChallengeFilter';
import { ChallengeSort } from '@/components/challenge/ChallengeSort';
import { ChallengeCard } from '@/components/challenge/ChallengeCard';
import plusIcon from '@/assets/icons/plus.svg';
import searchIcon from '@/assets/icons/search.svg';
import filterActiveIcon from '@/assets/icons/filter-active.svg';
import filterInactiveIcon from '@/assets/icons/filter-inactive.svg';
import * as styles from './ChallengeList.css';

// 한 페이지에 보여줄 카드 수 (모든 화면 5개)
const PAGE_SIZE = 5;

export default function ChallengeList() {
  const { params, updateParams } = useChallengeListParams();
  const { data, isPending, isError, error } = useChallenges({
    ...params,
    pageSize: PAGE_SIZE,
  });
  const [keyword, setKeyword] = useState(params.keyword ?? '');

  const handleSearch = (event) => {
    event.preventDefault();
    updateParams({ keyword: keyword.trim() });
  };

  const filterCount =
    (params.category ? params.category.split(',').length : 0) +
    (params.documentType ? 1 : 0) +
    (params.progress ? 1 : 0);
  const hasFilter = filterCount > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>챌린지 목록</h1>
        <Button as={Link} href="/challenges/new" className={styles.newButton}>
          신규 챌린지 신청
          <Image src={plusIcon} alt="" />
        </Button>
      </div>

      <div className={styles.toolbar}>
        <Popover
          className={styles.filterPanel}
          trigger={
            <button
              type="button"
              className={clsx(
                styles.filterButton,
                hasFilter && styles.filterButtonActive,
              )}
            >
              {hasFilter ? `필터(${filterCount})` : '필터'}
              <Image
                src={hasFilter ? filterActiveIcon : filterInactiveIcon}
                alt=""
              />
            </button>
          }
        >
          {({ close }) => (
            <ChallengeFilter
              params={params}
              onApply={(filters) => {
                updateParams(filters);
                close();
              }}
              onClose={close}
            />
          )}
        </Popover>

        <form className={styles.search} onSubmit={handleSearch} role="search">
          <Image src={searchIcon} alt="" className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            aria-label="챌린지 이름 검색"
            placeholder="챌린지 이름을 검색해보세요"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </form>

        <ChallengeSort
          value={params.sort ?? 'createdAtDesc'}
          onChange={(sort) => updateParams({ sort })}
        />
      </div>

      {isPending && <p className={styles.message}>불러오는 중...</p>}

      {isError && (
        <p role="alert" className={styles.message}>
          {error.message}
        </p>
      )}

      {data && data.items.length === 0 && (
        <p className={styles.message}>
          아직 챌린지가 없어요,
          <br />
          지금 바로 챌린지를 신청해보세요!
        </p>
      )}

      {data && data.items.length > 0 && (
        <>
          <ul className={styles.cardList}>
            {data.items.map((challenge) => (
              <li key={challenge.id}>
                <ChallengeCard challenge={challenge} />
              </li>
            ))}
          </ul>
          <Pagination
            className={styles.pagination}
            currentPage={params.page}
            totalPage={data.pagination.totalPages}
            onPageChange={(page) => updateParams({ page })}
          />
        </>
      )}
    </div>
  );
}
