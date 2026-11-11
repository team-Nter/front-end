'use client';

import { useRequireAdmin } from '@/hooks/useRequireAdmin';
import * as styles from './AdminGuard.css';

export default function AdminGuard({ children }) {
  const { isChecking, isError, refetch } = useRequireAdmin();

  if (isError) {
    return (
      <div role="alert" className={styles.message}>
        <p>사용자 정보를 확인하지 못했어요.</p>
        <button
          type="button"
          className={styles.retry}
          onClick={() => refetch()}
        >
          다시 시도
        </button>
      </div>
    );
  }
  if (isChecking) {
    return <p className={styles.message}>불러오는 중...</p>;
  }

  return children;
}
