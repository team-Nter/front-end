'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from './useMe';

export function useRedirectFromLanding() {
  const router = useRouter();

  const {
    data: user,
    isFetching,
    isError,
  } = useMe({
    refetchOnMount: 'always',
  });

  // 재조회가 실패한 경우는 로그인 여부를 확신할 수 없으니 비로그인처럼 취급
  const isLoggedIn = !!user && !isError;
  const role = user?.role;

  useEffect(() => {
    if (!isFetching && isLoggedIn) {
      router.replace(role === 'ADMIN' ? '/admin/challenges' : '/challenges');
    }
  }, [router, isFetching, isLoggedIn, role]);

  return { isLoggedIn };
}
