'use client';

import { getChallenges } from '@/api/challenges';
import { queryKeys } from '@/constants/query-keys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useChallenges(params, options) {
  return useQuery({
    queryKey: queryKeys.challenges.list(params),
    queryFn: ({ signal }) => getChallenges(params, { signal }),
    placeholderData: keepPreviousData,
    ...options,
  });
}
