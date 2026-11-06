'use client';

import {
  createChallenge,
  cancelMyChallenge,
  getMyChallengeDetail,
  getMyChallenges,
} from '@/api/challenges';
import { queryKeys } from '@/constants/query-keys';
import {
  useMutation,
  useQueryClient,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';

const NON_RETRYABLE_STATUS = [400, 401, 403, 404];
const retry = (failureCount, error) =>
  !NON_RETRYABLE_STATUS.includes(error?.status) && failureCount < 3;

export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.challenges.all() });
    },
  });
}

export function useMyChallenges({ type, page, pageSize, keyword, status }) {
  const params = { type, page, pageSize, keyword, status };

  return useQuery({
    queryKey: queryKeys.challenges.myList(params),
    queryFn: () => getMyChallenges(params),
    placeholderData: keepPreviousData,
    retry,
  });
}

export function useMyChallengeDetail(challengeId) {
  return useQuery({
    queryKey: queryKeys.challenges.myDetail(challengeId),
    queryFn: () => getMyChallengeDetail(challengeId),
    enabled: Boolean(challengeId),
    retry,
  });
}

export function useCancelMyChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMyChallenge,
    onSuccess: (_data, challengeId) => {
      queryClient.removeQueries({
        queryKey: queryKeys.challenges.myDetail(challengeId),
      });
      return queryClient.invalidateQueries({
        queryKey: queryKeys.challenges.myLists(),
      });
    },
  });
}
