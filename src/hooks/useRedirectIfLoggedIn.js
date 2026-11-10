'use client';

import { useRouter } from 'next/navigation';
import { useMe } from './useMe';
import { useEffect } from 'react';

export function useRedirectIfLoggedIn() {
  const router = useRouter();

  const {
    data: user,
    isPending,
    isFetching,
    isError,
    refetch,
    isPaused,
  } = useMe({
    refetchOnMount: 'always',
    retry: 3,
  });

  const isLoggedIn = !!user;
  const role = user?.role;

  useEffect(() => {
    if (!isFetching && isLoggedIn && !isError) {
      if (role === 'ADMIN') {
        router.replace('/admin/challenges');
      } else {
        router.replace('/challenges');
      }
    }
  }, [router, isFetching, isLoggedIn, role, isError]);

  return {
    user,
    isLoggedIn,
    isPending,
    isFetching,
    isError,
    refetch,
    isPaused,
  };
}
