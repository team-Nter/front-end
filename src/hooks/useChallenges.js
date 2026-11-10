'use client';

import { useMe } from '@/hooks/useMe';
import {
  createChallenge,
  cancelMyChallenge,
  getChallenges,
  getMyChallengeDetail,
  getMyChallenges,
  getAdminChallenges,
  getAdminChallengeDetail,
  moderateChallenge,
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

export function useChallenges(params, options) {
  return useQuery({
    queryKey: queryKeys.challenges.list(params),
    queryFn: ({ signal }) => getChallenges(params, { signal }),
    placeholderData: keepPreviousData,
    ...options,
  });
}

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
  const { data: me } = useMe();
  const params = { type, page, pageSize, keyword, status };

  return useQuery({
    queryKey: queryKeys.challenges.myList(me?.id, params),
    queryFn: ({ signal }) => getMyChallenges(params, { signal }),
    enabled: Boolean(me),
    placeholderData: (previousData, previousQuery) => {
      const [, , , prevUserId, prevParams] = previousQuery?.queryKey ?? [];
      const isSameView = prevUserId === me?.id && prevParams?.type === type;
      return isSameView ? previousData : undefined;
    },
    retry,
  });
}

export function useMyChallengeDetail(challengeId) {
  const { data: me } = useMe();
  return useQuery({
    queryKey: queryKeys.challenges.myDetail(me?.id, challengeId),
    queryFn: () => getMyChallengeDetail(challengeId),
    enabled: Boolean(me?.id && challengeId),
    retry,
  });
}

export function useCancelMyChallenge() {
  const queryClient = useQueryClient();
  const { data: me } = useMe();

  return useMutation({
    mutationFn: cancelMyChallenge,
    onSuccess: (_data, challengeId) => {
      queryClient.removeQueries({
        queryKey: queryKeys.challenges.myDetail(me?.id, challengeId),
      });
      return queryClient.invalidateQueries({
        queryKey: queryKeys.challenges.myLists(),
      });
    },
  });
}

export function useAdminChallenges({ status, sort, page, pageSize, keyword }) {
  const { data: me } = useMe();
  const params = { status, sort, page, pageSize, keyword };

  return useQuery({
    queryKey: queryKeys.challenges.adminList(me?.id, params),
    queryFn: ({ signal }) => getAdminChallenges(params, { signal }),
    enabled: me?.role === 'ADMIN',
    placeholderData: (previousData, previousQuery) => {
      const prevUserId = previousQuery?.queryKey[3];
      return prevUserId === me?.id ? previousData : undefined;
    },
    retry,
  });
}

export function useAdminChallengeDetail(
  challengeId,
  { status, sort, keyword },
) {
  const { data: me } = useMe();
  const params = { status, sort, keyword };

  return useQuery({
    queryKey: queryKeys.challenges.adminDetail(me?.id, challengeId, params),
    queryFn: () => getAdminChallengeDetail(challengeId, params),
    enabled: me?.role === 'ADMIN' && Boolean(challengeId),
    retry,
  });
}

export function useModerateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moderateChallenge,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.challenges.all(),
      }),
  });
}
