import { Modal } from '@/components/common/Modal';
import Link from 'next/link';

export function OfflineNotice() {
  return <p>오프라인 상태예요. 네트워크 연결이 복구되면 다시 시도해 주세요.</p>;
}

export function AuthCheckErrorModal({ isFetching, onRetry }) {
  return (
    <Modal aria-labelledby="retry-title">
      <p id="retry-title">사용자 확인이 늦어지고 있어요.</p>
      <button type="button" onClick={onRetry} disabled={isFetching}>
        {isFetching ? '확인 중...' : '다시 시도'}
      </button>
      <Link href="/">홈으로 이동</Link>
    </Modal>
  );
}
