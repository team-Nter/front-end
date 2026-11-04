import profileUser from '@/assets/icons/profile-user.svg';
import profileAdmin from '@/assets/icons/profile-admin.svg';
import Image from 'next/image';
import * as styles from './UserMenu.css.js';
import { useLogout } from '@/hooks/useLogout.js';
import { useEffect, useRef, useState } from 'react';

export function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { mutate: handleLogout, isPending } = useLogout();

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

          <button type="button" className={styles.menuItem}>
            나의 챌린지
          </button>
          <button
            type="button"
            className={styles.menuItem}
            onClick={() => handleLogout()}
            disabled={isPending}
          >
            {isPending ? '로그아웃 중...' : '로그아웃'}
          </button>
        </div>
      )}
    </div>
  );
}
