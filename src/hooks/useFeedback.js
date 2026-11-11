'use client';

import {
  createFeedback,
  deleteFeedback,
  getFeedbacks,
  updateFeedback,
} from '@/api/feedback';
import { queryKeys } from '@/constants/query-keys';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useFeedbacks(submissionId, pageSize = 3) {
  // 페이지네이션용 불러오기 위해서 InfiniteQuery 사용
  return useInfiniteQuery({
    queryKey: queryKeys.feedbacks.list(submissionId, pageSize),
    queryFn: ({ pageParam }) => getFeedbacks(submissionId, pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: Boolean(submissionId),
  });
}

export function useCreateFeedback(submissionId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => createFeedback(submissionId, content),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.feedbacks.lists(submissionId),
      });
    },
  });
}
export function useUpdateFeedback(feedbackId, submissionId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => updateFeedback(feedbackId, content),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.feedbacks.lists(submissionId),
      });
    },
  });
}

export function useDeleteFeedback(feedbackId, submissionId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reason) => deleteFeedback(feedbackId, reason),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.feedbacks.lists(submissionId),
      });
    },
  });
}
