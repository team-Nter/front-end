'use client';

import { useState } from 'react';
import {
  CHALLENGE_CATEGORY_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  PROGRESS_OPTIONS,
} from '@/constants/challenge';

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
    <div>
      <div>
        <strong>필터</strong>
        <button type="button" aria-label="필터 닫기" onClick={onClose}>
          X
        </button>
      </div>

      <fieldset>
        <legend>분야</legend>
        {CHALLENGE_CATEGORY_OPTIONS.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              checked={filters.category.includes(option.value)}
              onChange={() => toggleCategory(option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>문서 타입</legend>
        {DOCUMENT_TYPE_OPTIONS.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="documentType"
              checked={filters.documentType === option.value}
              onChange={() => selectOption('documentType', option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>상태</legend>
        {PROGRESS_OPTIONS.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="progress"
              checked={filters.progress === option.value}
              onChange={() => selectOption('progress', option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <button type="button" onClick={() => setFilters(EMPTY_FILTERS)}>
        초기화
      </button>
      <button type="button" onClick={() => onApply(filters)}>
        적용하기
      </button>
    </div>
  );
}
