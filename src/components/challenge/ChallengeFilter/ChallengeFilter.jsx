'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import {
  CHALLENGE_CATEGORY_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  PROGRESS_OPTIONS,
} from '@/constants/challenge';
import closeIcon from '@/assets/icons/out.svg';
import checkboxChecked from '@/assets/icons/checkbox-checked.svg';
import checkboxUnchecked from '@/assets/icons/checkbox-unchecked.svg';
import radioChecked from '@/assets/icons/radio-checked.svg';
import radioUnchecked from '@/assets/icons/radio-unchecked.svg';
import * as styles from './ChallengeFilter.css';

const EMPTY_FILTERS = { category: [], documentType: '', progress: '' };

export default function ChallengeFilter({ params, onApply, onClose }) {
  const [filters, setFilters] = useState({
    category: params.category?.split(',') ?? [],
    documentType: params.documentType ?? '',
    progress: params.progress ?? '',
  });

  const toggleCategory = (value) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(value)
        ? prev.category.filter((item) => item !== value)
        : [...prev.category, value],
    }));
  };

  const selectOption = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
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
        <legend className={styles.legend}>분야</legend>
        {CHALLENGE_CATEGORY_OPTIONS.map((option) => {
          const checked = filters.category.includes(option.value);
          return (
            <label key={option.value} className={styles.option}>
              <input
                type="checkbox"
                className={styles.hiddenInput}
                checked={checked}
                onChange={() => toggleCategory(option.value)}
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
        <legend className={styles.legend}>문서 타입</legend>
        {DOCUMENT_TYPE_OPTIONS.map((option) => {
          const checked = filters.documentType === option.value;
          return (
            <label key={option.value} className={styles.option}>
              <input
                type="radio"
                name="documentType"
                className={styles.hiddenInput}
                checked={checked}
                onChange={() => selectOption('documentType', option.value)}
              />
              <Image src={checked ? radioChecked : radioUnchecked} alt="" />
              {option.label}
            </label>
          );
        })}
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>상태</legend>
        {PROGRESS_OPTIONS.map((option) => {
          const checked = filters.progress === option.value;
          return (
            <label key={option.value} className={styles.option}>
              <input
                type="radio"
                name="progress"
                className={styles.hiddenInput}
                checked={checked}
                onChange={() => selectOption('progress', option.value)}
              />
              <Image src={checked ? radioChecked : radioUnchecked} alt="" />
              {option.label}
            </label>
          );
        })}
      </fieldset>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          className={styles.resetButton}
          onClick={() => setFilters(EMPTY_FILTERS)}
        >
          초기화
        </Button>
        <Button className={styles.applyButton} onClick={() => onApply(filters)}>
          적용하기
        </Button>
      </div>
    </div>
  );
}
