'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moderateChallenge } from '@/api/moderations';
import { queryKeys } from '@/constants/query-keys';

export function useModerateChallenge(challengeId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ action, reason }) =>
      moderateChallenge(challengeId, { action, reason }),
    onSuccess: () => {
      const detailKey = queryKeys.challenges.detail(challengeId);
      queryClient.invalidateQueries({
        queryKey: detailKey,
        refetchType: 'none',
      });

      return queryClient.invalidateQueries({
        queryKey: queryKeys.challenges.all(),
        predicate: (query) =>
          !detailKey.every((part, index) => query.queryKey[index] === part),
      });
    },
  });
}
