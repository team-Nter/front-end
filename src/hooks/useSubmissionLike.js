'use client';

import { deleteSubmissionLike, putSubmissionLike } from '@/api/submission-like';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSubmissionLike(submissionId) {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.submissions.detail(submissionId);

  const cancelDetailQuery = () =>
    queryClient.cancelQueries({ queryKey, exact: true });

  const updateLike = (result, isLiked) => {
    const challengeId = queryClient.getQueryData(queryKey)?.challengeId;

    queryClient.setQueryData(queryKey, (previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        likeCount: result.likeCount,
        isLiked,
      };
    });

    if (challengeId === undefined || challengeId === null) return;

    return queryClient.invalidateQueries({
      queryKey: ['submissions', 'list'],
      predicate: (query) => String(query.queryKey[2]) === String(challengeId),
    });
  };

  const putLikes = useMutation({
    mutationFn: () => putSubmissionLike(submissionId),
    onMutate: cancelDetailQuery,
    onSuccess: (result) => updateLike(result, true),
  });

  const deleteLikes = useMutation({
    mutationFn: () => deleteSubmissionLike(submissionId),
    onMutate: cancelDetailQuery,
    onSuccess: (result) => updateLike(result, false),
  });

  return { putLikes, deleteLikes };
}
