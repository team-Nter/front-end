'use client';

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  getParticipants,
  getParticipation,
  joinChallenge,
} from '@/api/participations';
import { queryKeys } from '@/constants/query-keys';

export function useParticipation(challengeId, userId) {
  return useSuspenseQuery({
    queryKey: queryKeys.participations.detail(challengeId, userId),
    queryFn: () => getParticipation(challengeId, userId),
    retry: (failureCount, error) =>
      ![400, 401, 403, 404].includes(error?.status) && failureCount < 3,
  });
}

const PARTICIPANTS_PAGE_SIZE = 5;

const NON_RETRYABLE_STATUS = [400, 401, 403, 404];
const retry = (failureCount, error) =>
  !NON_RETRYABLE_STATUS.includes(error?.status) && failureCount < 3;

export function useParticipants(challengeId, page) {
  const params = { page, pageSize: PARTICIPANTS_PAGE_SIZE };

  return useQuery({
    queryKey: queryKeys.challenges.participants(challengeId, params),
    queryFn: ({ signal }) => getParticipants(challengeId, params, { signal }),
    placeholderData: keepPreviousData,
    retry,
  });
}

export function useJoinChallenge(challengeId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => joinChallenge(challengeId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.challenges.all() }),
  });
}
