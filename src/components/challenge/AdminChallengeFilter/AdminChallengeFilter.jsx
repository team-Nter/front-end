'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import closeIcon from '@/assets/icons/out.svg';
import checkboxChecked from '@/assets/icons/checkbox-checked.svg';
import checkboxUnchecked from '@/assets/icons/checkbox-unchecked.svg';
import radioChecked from '@/assets/icons/radio-checked.svg';
import radioUnchecked from '@/assets/icons/radio-unchecked.svg';
import {
  ADMIN_DEFAULT_SORT,
  ADMIN_SORT_OPTIONS,
  CHALLENGE_STATUS_OPTIONS,
} from '@/constants/challenge';
import * as styles from './AdminChallengeFilter.css';

const EMPTY_FILTERS = { status: [], sort: ADMIN_DEFAULT_SORT };

export default function AdminChallengeFilter({
  value,
  onApply,
  onReset,
  onClose,
}) {
  const [filters, setFilters] = useState({
    status: value.status ?? [],
    sort: value.sort ?? ADMIN_DEFAULT_SORT,
  });

  const toggleStatus = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((item) => item !== status)
        : [...prev.status, status],
    }));
  };

  const selectSort = (sort) => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <strong className={styles.heading}>필터</strong>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="필터 닫기"
          onClick={onClose}
        >
          <Image src={closeIcon} alt="" />
        </button>
      </div>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>상태</legend>
        {CHALLENGE_STATUS_OPTIONS.map((option) => {
          const checked = filters.status.includes(option.value);
          return (
            <label key={option.value} className={styles.option}>
              <input
                type="checkbox"
                className={styles.hiddenInput}
                checked={checked}
                onChange={() => toggleStatus(option.value)}
              />
              <Image
                src={checked ? checkboxChecked : checkboxUnchecked}
                alt=""
              />
              {option.label}
            </label>
          );
        })}
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>정렬</legend>
        {ADMIN_SORT_OPTIONS.map((option) => {
          const checked = filters.sort === option.value;
          return (
            <label key={option.value} className={styles.option}>
              <input
                type="radio"
                name="adminSort"
                className={styles.hiddenInput}
                checked={checked}
                onChange={() => selectSort(option.value)}
              />
              <Image src={checked ? radioChecked : radioUnchecked} alt="" />
              {option.label}
            </label>
          );
        })}
      </fieldset>

      <div className={styles.actions}>
        <Button fullWidth onClick={() => onApply(filters)}>
          적용하기
        </Button>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => {
            setFilters(EMPTY_FILTERS);
            onReset(EMPTY_FILTERS);
          }}
        >
          초기화
        </Button>
      </div>
    </div>
  );
}
