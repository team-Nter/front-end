'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import logo from '@/assets/images/logo.svg';
import { Container } from '@/components/layout/Container';
import * as styles from './Header.css.js';
import { HeaderAuthAction } from '@/components/auth/commonAuth/HeaderAuthAction.jsx';

export default function Header({ className, loginHref = '/login', children }) {
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
          <HeaderAuthAction loginHref={loginHref} />
        </div>
      </Container>
    </header>
  );
}
