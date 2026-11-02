'use client';

import { Button } from '@/components/common/Button';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/common/Modal';
import outIcon from '@/assets/icons/dereliction.svg';
import clsx from 'clsx';
import * as styles from './EditHeader.css';

export default function EditHeader({ challengeId, handleSubmit }) {
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
    <>
      <header className={styles.header}>
        <Link href="/" aria-label="독스루 홈">
          <Image
            className={styles.logo}
            src={logo}
            alt="Docthru"
            loading="eager"
          />
        </Link>
        <div className={styles.actions}>
          <Button
            className={clsx(styles.action, styles.exit)}
            aria-label="나가기"
            onClick={() => setIsExitModalOpen(true)}
          >
            <span className={styles.exitText}>나가기</span>
            <Image className={styles.exitIcon} src={outIcon} alt="" />
          </Button>
          {/* 임시저장 부분은 2차 MVP로 이후 기능 구현 */}
          <Button
            className={clsx(styles.action, styles.save)}
            variant="secondary"
            title="임시저장은 준비 중입니다"
          >
            임시저장
          </Button>
          <Button className={styles.action} onClick={handleSubmit}>
            제출하기
          </Button>
        </div>
      </header>
      {isExitModalOpen && (
        <Modal className={styles.modal} aria-labelledby="exit-modal-title">
          <h2 className={styles.modalTitle} id="exit-modal-title">
            작성을 그만두시겠어요?
          </h2>
          <p className={styles.modalDescription}>
            저장하지 않은 내용은 사라질 수 있어요.
          </p>

          <div className={styles.modalActions}>
            <Button variant="secondary" onClick={closeExitModal}>
              취소
            </Button>
            <Button onClick={handleExit}>확인</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
