'use client';

import { deleteSubmissionLike, putSubmissionLike } from '@/api/submission-like';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSubmissionLike(submissionId) {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.submissionLike.detail(submissionId);

  const putLikes = useMutation({
    mutationFn: () => putSubmissionLike(submissionId),
    onSuccess: (result) => queryClient.setQueryData(queryKey, result),
  });

  const deleteLikes = useMutation({
    mutationFn: () => deleteSubmissionLike(submissionId),
    onSuccess: () => {
      queryClient.setQueryData(queryKey, {
        submissionId,
        submissionLike: null,
      });
    },
  });

  return { putLikes, deleteLikes };
}
