import profileUser from '@/assets/icons/profile-user.svg';
import Image from 'next/image';
import * as styles from './UserMenu.css.js';
import { useLogout } from '@/hooks/useLogout.js';

export function UserMenu({ user }) {
  const { mutate: handleLogout, isPending } = useLogout();

  return (
    <div className={styles.userMenu}>
      <button className={styles.userMenuButton} aria-label="사용자 메뉴">
        <Image src={profileUser} width={32} height={32} alt="" />
      </button>

      <div className={styles.dropdown}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <Image src={profileUser} width={32} height={32} alt="" />
          </div>

          <div className={styles.userDetails}>
            <span className={styles.nickname}>{user.nickname}</span>
            <span className={styles.grade}>{user.role}</span>
          </div>
        </div>

        <div className={styles.divider} />

        <button className={styles.menuItem}>나의 챌린지</button>
        <button
          type="button"
          className={styles.menuItem}
          onClick={() => handleLogout()}
          disabled={isPending}
        >
          {isPending ? '로그아웃 중...' : '로그아웃'}
        </button>
      </div>
    </div>
  );
}
// 없을 경우를 대비해 기본값 방어
