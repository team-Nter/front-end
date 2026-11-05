import { Button } from '@/components/common/Button';
import { UserMenu } from '@/components/auth/commonAuth/UserMenu';
import { useMe } from '@/hooks/useMe';
import Link from 'next/link';
import * as styles from './HeaderAuthAction.css';

export function HeaderAuthAction({ loginHref }) {
  const { data: user, isPending, isError, refetch } = useMe();
  const isLoggedIn = !!user?.id;
  const hasAuthError = isError && !user;
  if (isPending) return null;
  if (hasAuthError) {
    return (
      <Button variant="secondary" onClick={() => refetch()}>
        다시 시도
      </Button>
    );
  }
  if (isLoggedIn) {
    return <UserMenu user={user} />;
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
