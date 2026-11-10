'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { Popover } from '@/components/common/Popover';
import { CHALLENGE_SORT_OPTIONS } from '@/constants/challenge';
import toggleDownIcon from '@/assets/icons/toggle-down.svg';
import * as styles from './ChallengeSort.css';

export default function ChallengeSort({ value, onChange }) {
  const current =
    CHALLENGE_SORT_OPTIONS.find((option) => option.value === value) ??
    CHALLENGE_SORT_OPTIONS[0];

  return (
    <Popover
      align="right"
      className={styles.panel}
      trigger={
        <button
          type="button"
          className={styles.trigger}
          aria-label={`정렬: ${current.label}`}
        >
          <span className={styles.label}>{current.label}</span>
          <Image src={toggleDownIcon} alt="" />
        </button>
      }
    >
      {({ close }) => (
        <ul className={styles.list}>
          {CHALLENGE_SORT_OPTIONS.map((option) => {
            const isSelected = option.value === current.value;

            return (
              <li key={option.value}>
                <button
                  type="button"
                  className={clsx(
                    styles.option,
                    isSelected && styles.optionSelected,
                  )}
                  aria-pressed={isSelected}
                  onClick={() => {
                    if (!isSelected) onChange(option.value);
                    close();
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Popover>
  );
}
