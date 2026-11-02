'use client';

import { useRouter } from 'next/navigation';
import { useMe } from './useMe';
import { useEffect } from 'react';

export function useRedirectIfLoggedIn() {
  const router = useRouter();

  const {
    data: user,
    isFetching,
    isSuccess,
  } = useMe({ refetchOnMount: 'always' });

  const isLoggedIn = isSuccess && !!user;

  useEffect(() => {
    if (!isFetching && isLoggedIn) {
      router.replace('/');
    }
  }, [router, isFetching, isLoggedIn]);

  return { isLoggedIn, isFetching };
}
