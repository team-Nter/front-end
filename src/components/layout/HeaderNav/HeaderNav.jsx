'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMe } from '@/hooks/useMe';
import * as styles from './HeaderNav.css.js';

// 역할별 헤더 메뉴 (일반 · 비로그인 메뉴는 시안에 없어서 어드민 메뉴와 같은 모양으로 맞춰요)
const ADMIN_MENU = [
  { href: '/admin/challenges', label: '챌린지 관리' },
  { href: '/challenges', label: '챌린지 목록' },
];

const USER_MENU = [
  { href: '/challenges', label: '챌린지 목록' },
  { href: '/my-challenges', label: '나의 챌린지' },
];

const GUEST_MENU = [{ href: '/challenges', label: '챌린지 목록' }];

function getMenu(me) {
  if (me === null) return GUEST_MENU;
  if (me.role === 'ADMIN') return ADMIN_MENU;
  return USER_MENU;
}

// 지금 주소가 메뉴 경로이거나 그 아래 경로(예: /challenges/123)면 현재 메뉴예요.
function isCurrentPath(pathname, href) {
  return pathname === href;
}

export default function HeaderNav() {
  const { data: me } = useMe();
  const pathname = usePathname();

  // 내 정보를 확인하는 중에는 그리지 않아요 (역할이 정해지면서 메뉴가 바뀌어 깜빡이지 않게)
  if (me === undefined) return null;

  return (
    <nav aria-label="주요 메뉴" className={styles.nav}>
      <ul className={styles.list}>
        {getMenu(me).map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={styles.link}
              aria-current={isCurrentPath(pathname, href) ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
