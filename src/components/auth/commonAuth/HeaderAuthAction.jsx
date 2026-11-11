import { Button } from '@/components/common/Button';
import { UserMenu } from '@/components/auth/commonAuth/UserMenu';
import { useMe } from '@/hooks/useMe';
import { NotificationBell } from '@/components/notification/NotificationBell';
import Link from 'next/link';
import * as styles from './HeaderAuthAction.css';

export function HeaderAuthAction({ loginHref }) {
  const { data: user, isPending, isError, refetch } = useMe();
  const isLoggedIn = !!user?.id;

  if (isPending) return null;

  if (isError) {
    return (
      <>
        <Button
          variant="secondary"
          onClick={() => refetch()}
          aria-label="로그인 상태 다시 시도"
        >
          다시 시도
        </Button>
        {isLoggedIn && (
          <div className={styles.loggedIn}>
            <NotificationBell />
            <UserMenu user={user} />
          </div>
        )}
      </>
    );
  }

  if (isLoggedIn) {
    return (
      <div className={styles.loggedIn}>
        <NotificationBell />
        <UserMenu user={user} />
      </div>
    );
  }

  return (
    <Button
      as={Link}
      href={loginHref}
      variant="secondary"
      className={styles.login}
    >
      로그인
    </Button>
  );
}
