'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMe } from './useMe';
import { useEffect } from 'react';

function getSafeNext(next) {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return null;
  return next;
}

export function useRedirectIfLoggedIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = getSafeNext(searchParams.get('next'));

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
        router.replace(next ?? '/challenges');
      }
    }
  }, [router, isFetching, isLoggedIn, role, isError, next]);

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
