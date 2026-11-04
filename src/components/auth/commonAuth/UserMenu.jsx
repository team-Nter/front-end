import profileUser from '@/assets/icons/profile-user.svg';
import Image from 'next/image';
import * as styles from './UserMenu.css.js';

export function UserMenu() {
  return (
    <div className={styles.userMenu}>
      <button className={styles.userMenuButton}>
        <Image src={profileUser} width={32} height={32} alt="user-profile" />
      </button>

      <div className={styles.dropdown}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <Image
              src={profileUser}
              width={32}
              height={32}
              alt="user-profile"
            />
          </div>

          <div className={styles.userDetails}>
            <span className={styles.nickname}>체다치즈</span>
            <span className={styles.grade}>전문가</span>
          </div>
        </div>

        <div className={styles.divider} />

        <button className={styles.menuItem}>나의 챌린지</button>
        <button className={styles.menuItem}>로그아웃</button>
      </div>
    </div>
  );
}
