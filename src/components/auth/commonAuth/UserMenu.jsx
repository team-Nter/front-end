import profileUser from '@/assets/icons/profile-user.svg';
import profileAdmin from '@/assets/icons/profile-admin.svg';
import Image from 'next/image';
import * as styles from './UserMenu.css.js';
import { useLogout } from '@/hooks/useLogout.js';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const {
    mutate: handleLogout,
    isPending,
    isPaused,
    isError,
    reset,
  } = useLogout();

  useEffect(() => {
    if (!isOpen && isError) reset();
  }, [isOpen, isError, reset]);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e) => {
      if (!menuRef.current?.contains(e.target)) setIsOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const userProfile = user.role === 'ADMIN' ? profileAdmin : profileUser;
  const userGrade =
    user.role === 'ADMIN'
      ? '어드민'
      : user.grade === 'EXPERT'
        ? '전문가'
        : '일반';

  const getLogoutLabel = () => {
    if (isPending && isPaused) return '연결 대기 중...';
    if (isPending) return '로그아웃 중...';
    return '로그아웃';
  };

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button
        type="button"
        className={styles.userMenuButton}
        aria-label="사용자 메뉴"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image src={userProfile} width={32} height={32} alt="" />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <Image src={userProfile} width={32} height={32} alt="" />
            </div>

            <div className={styles.userDetails}>
              <span className={styles.nickname}>
                {user.nickname || '닉네임'}
              </span>
              <span className={styles.grade}>{userGrade}</span>
            </div>
          </div>

          <div className={styles.divider} />

          {user.role === 'ADMIN' ? null : (
            <Link
              href="/my-challenges"
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              나의 챌린지
            </Link>
          )}
          <button
            type="button"
            className={styles.menuItem}
            onClick={() => handleLogout()}
            disabled={isPending}
          >
            {getLogoutLabel()}
          </button>

          {isError && (
            <p role="alert">로그아웃에 실패했어요. 다시 시도해 주세요.</p>
          )}
        </div>
      )}
    </div>
  );
}
