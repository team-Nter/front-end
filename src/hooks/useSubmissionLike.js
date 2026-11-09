'use client';

import { deleteSubmissionLike, putSubmissionLike } from '@/api/submission-like';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSubmissionLike(submissionId) {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.submissions.detail(submissionId);

  // submission 부분에 있어 like 업데이트
  const updateLike = (result, isLiked) => {
    queryClient.setQueryData(queryKey, (previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        likeCount: result.likeCount,
        isLiked,
      };
    });
  };

  const putLikes = useMutation({
    mutationFn: () => putSubmissionLike(submissionId),
    onSuccess: (result) => updateLike(result, true),
  });

  const deleteLikes = useMutation({
    mutationFn: () => deleteSubmissionLike(submissionId),
    onSuccess: (result) => updateLike(result, false),
  });

  return { putLikes, deleteLikes };
}
