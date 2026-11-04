'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getParticipation } from '@/api/participations';
import { queryKeys } from '@/constants/query-keys';

export function useParticipation(challengeId, userId) {
  return useSuspenseQuery({
    queryKey: queryKeys.participations.detail(challengeId, userId),
    queryFn: () => getParticipation(challengeId, userId),
    retry: (failureCount, error) =>
      ![400, 401, 403, 404].includes(error?.status) && failureCount < 3,
  });
}
