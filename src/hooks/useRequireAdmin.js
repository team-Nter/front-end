'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from './useMe';

export function useRequireAdmin() {
  const router = useRouter();
  const { data: me, isPending, isError, refetch } = useMe();

  const isAdmin = me?.role === 'ADMIN';
  const shouldRedirect = !isPending && !isError && !isAdmin;

  useEffect(() => {
    if (!shouldRedirect) return;
    router.replace(me ? '/challenges' : '/');
  }, [shouldRedirect, me, router]);

  return {
    isAdmin,
    isChecking: isPending || shouldRedirect,
    isError,
    refetch,
  };
}
