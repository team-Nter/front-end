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
    isSuccess,
    isError,
    refetch,
  } = useMe({ refetchOnMount: 'always', retry: 3 });

  const isLoggedIn = isSuccess && !!user;

  useEffect(() => {
    if (!isFetching && isLoggedIn) {
      router.replace('/');
    }
  }, [router, isFetching, isLoggedIn]);

  return { isLoggedIn, isPending, isFetching, isError, refetch };
}
