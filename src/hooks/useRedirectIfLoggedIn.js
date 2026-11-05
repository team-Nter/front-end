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

  useEffect(() => {
    if (!isFetching && isLoggedIn) {
      router.replace('/'); // 차후 챌린지 목록으로 수정
    }
  }, [router, isFetching, isLoggedIn]);

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
