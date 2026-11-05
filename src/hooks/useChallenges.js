'use client';

import { createChallenge, getChallenges } from '@/api/challenges';
import { queryKeys } from '@/constants/query-keys';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

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
