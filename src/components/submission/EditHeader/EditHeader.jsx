'use client';

import { Button } from '@/components/common/Button';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/common/Modal';

export default function EditHeader({ challengeId }) {
  const router = useRouter();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // 모달창의 취소 버튼
  const closeExitModal = () => setIsExitModalOpen(false);
  // 나가기 버튼 누르면 일단 모달창이 떠야함 -> 모달창에 대한 상태값이 필요하고
  // 모달창에서 해당 버튼을 누르면 옮겨지게 만들면 됨.

  // 실질적으로 진짜 나간다 확인
  const handleExit = () => {
    router.push(`/challenges/${challengeId}`);
  };
  return (
    <div>
      <Link href="/" aria-label="독스루 홈">
        <Image src={logo} alt="Docthru" loading="eager" />
      </Link>
      <Button onClick={() => setIsExitModalOpen(true)}>나가기</Button>
      {/* 임시저장 부분은 2차 MVP로 이후 기능 구현 */}
      <Button variant="secondary">임시저장</Button>
      <Button>제출하기</Button>
      {isExitModalOpen && (
        <Modal aria-labelledby="exit-modal-title">
          <h2 id="exit-modal-title">작성을 그만두시겠어요?</h2>
          <p>저장하지 않은 내용은 사라질 수 있어요.</p>

          <Button variant="secondary" onClick={closeExitModal}>
            취소
          </Button>
          <Button onClick={handleExit}>확인</Button>
        </Modal>
      )}
    </div>
  );
}
