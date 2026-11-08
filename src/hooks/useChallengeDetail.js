'use client';

import { getChallengeDetail } from '@/api/challenges';
import { queryKeys } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';

const NON_RETRYABLE_STATUS = [400, 401, 403, 404];
const retry = (failureCount, error) =>
  !NON_RETRYABLE_STATUS.includes(error?.status) && failureCount < 3;

export function useChallengeDetail(challengeId) {
  return useQuery({
    queryKey: queryKeys.challenges.detail(challengeId),
    queryFn: ({ signal }) => getChallengeDetail(challengeId, { signal }),
    retry,
  });
}
