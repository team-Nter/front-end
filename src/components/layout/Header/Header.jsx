'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import logo from '@/assets/images/logo.svg';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/layout/Container';
import * as styles from './Header.css.js';
import { useMe } from '@/hooks/useMe.js';
import { UserMenu } from '@/components/auth/commonAuth/UserMenu.jsx';

export default function Header({ className, loginHref = '/login', children }) {
  const { data: user } = useMe();
  const isLoggedIn = !!user?.id;

  return (
    <header className={clsx(styles.header, className)}>
      <Container className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" aria-label="독스루 홈" className={styles.logoLink}>
            <Image
              src={logo}
              alt="Docthru"
              className={styles.logo}
              loading="eager"
            />
          </Link>
          {children}
        </div>

        <div className={styles.actions}>
          {!isLoggedIn ? (
            <Button
              as={Link}
              href={loginHref}
              variant="secondary"
              className={styles.login}
            >
              로그인
            </Button>
          ) : (
            <UserMenu user={user} />
          )}
        </div>
      </Container>
    </header>
  );
}
