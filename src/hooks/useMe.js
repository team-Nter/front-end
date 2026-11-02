'use client';

import { me } from '@/api/auth';
import { queryKeys } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';

export function useMe() {
  return useQuery({
    queryKey: queryKeys.users.info(),
    queryFn: me,
    retry: false,
    staleTime: Infinity,
  });
}

// const { data: user, isPending } = useMe();
