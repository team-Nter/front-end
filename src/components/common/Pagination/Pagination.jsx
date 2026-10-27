'use client';

import clsx from 'clsx';
import Image from 'next/image';
import leftIcon from '@/assets/icons/direction-left-black.svg';
import leftDisabledIcon from '@/assets/icons/direction-left-gray.svg';
import rightIcon from '@/assets/icons/direction-right-black.svg';
import rightDisabledIcon from '@/assets/icons/direction-right-gray.svg';
import * as styles from './Pagination.css.js';

export default function Pagination({
  currentPage,
  totalPage,
  pageSize = 5,
  onPageChange,
  className,
}) {
  const groupSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 5;
  const startPage = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPage);
  const pages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index,
  );
  if (pages.length === 0) return null;

  return (
    <nav
      aria-label="페이지 이동"
      className={clsx(styles.pagination, className)}
    >
      <button
        type="button"
        className={styles.arrow}
        aria-label="이전 페이지 묶음"
        disabled={startPage <= 1}
        onClick={() => onPageChange(Math.max(1, startPage - groupSize))}
      >
        <Image
          src={startPage <= 1 ? leftDisabledIcon : leftIcon}
          alt=""
          width={24}
          height={24}
        />
      </button>
      <div className={styles.pages}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={clsx(styles.page, currentPage === page && styles.active)}
            aria-label={`${page}페이지`}
            aria-current={currentPage === page ? 'page' : undefined}
            onClick={() => {
              if (currentPage !== page) onPageChange(page);
            }}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.arrow}
        aria-label="다음 페이지 묶음"
        disabled={endPage >= totalPage}
        onClick={() => onPageChange(Math.min(totalPage, endPage + 1))}
      >
        <Image
          src={endPage >= totalPage ? rightDisabledIcon : rightIcon}
          alt=""
          width={24}
          height={24}
        />
      </button>
    </nav>
  );
}
