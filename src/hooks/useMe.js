'use client';

import { me } from '@/api/auth';
import { queryKeys } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';

export function useMe(options) {
  return useQuery({
    queryKey: queryKeys.users.info(),
    queryFn: me,
    retry: false,
    staleTime: Infinity,
    ...options,
  });
}

// const { data: user, isPending } = useMe();
