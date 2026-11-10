'use client';

import { MY_CHALLENGE_TABS } from '@/constants/challenge';
import * as styles from './ChallengeTab.css';

export default function ChallengeTab({ type, onChange }) {
  return (
    <div role="tablist" aria-label="나의 챌린지" className={styles.tabList}>
      {MY_CHALLENGE_TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={type === tab.value}
          className={styles.tab}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
