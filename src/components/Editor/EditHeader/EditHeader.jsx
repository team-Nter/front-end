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

export default function EditHeader({
  challengeId,
  handleSubmit,
  handleSaveDraft,
  isSubmitting,
  isSaving,
}) {
  const router = useRouter();
  const [exitPath, setExitPath] = useState(null);

  // 모달창의 취소 버튼
  const closeExitModal = () => setExitPath(null);

  // 실질적으로 진짜 나간다 확인
  const handleExit = () => {
    if (exitPath) router.push(exitPath);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setExitPath('/');
  };
  return (
    <>
      <header className={styles.header}>
        <Link
          href="/"
          aria-label="독스루 홈"
          onClick={(event) => handleClick(event)}
        >
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
            onClick={() => setExitPath(`/challenges/${challengeId}`)}
          >
            <span className={styles.exitText}>나가기</span>
            <Image className={styles.exitIcon} src={outIcon} alt="" />
          </Button>
          {/* 임시저장 부분은 2차 MVP로 이후 기능 구현 */}
          <Button
            className={clsx(styles.action, styles.save)}
            variant="secondary"
            aria-label="임시저장"
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            {isSaving ? '저장 중' : '임시저장'}
          </Button>
          <Button
            className={styles.action}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '제출 중' : '제출하기'}
          </Button>
        </div>
      </header>
      {exitPath !== null && (
        <Modal
          className={styles.modal}
          aria-labelledby="exit-modal-title"
          onClose={closeExitModal}
        >
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
