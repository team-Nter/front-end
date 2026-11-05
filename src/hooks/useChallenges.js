'use client';

import { createChallenge } from '@/api/challenge';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.challenges.all() });
    },
  });
}
