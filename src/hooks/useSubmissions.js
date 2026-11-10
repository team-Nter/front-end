'use client';

import {
  createSubmission,
  deleteSubmission,
  getSubmission,
  getSubmissions,
  updateSubmission,
} from '@/api/submissions';
import { queryKeys } from '@/constants/query-keys';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

export function useSubmission(submissionId) {
  return useSuspenseQuery({
    queryKey: queryKeys.submissions.detail(submissionId),
    queryFn: () => getSubmission(submissionId),
  });
}

export function useSubmissions({ challengeId, page, pageSize }) {
  return useQuery({
    queryKey: queryKeys.submissions.list(challengeId, page, pageSize),
    queryFn: () => getSubmissions(challengeId, page, pageSize),
    enabled: Boolean(challengeId),
  });
}

export function useCreateSubmission(challengeId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createSubmission(challengeId, data),
    onSuccess: (submission) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.participations.detail(
          challengeId,
          String(submission.author.id),
        ),
        exact: true,
        refetchType: 'all',
      });
    },
  });
}

export function useUpdateSubmission(submissionId, challengeId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateSubmission(submissionId, data),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.submissions.detail(submissionId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.submissions.lists(challengeId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.challenges.detail(challengeId),
        }),
      ]),
  });
}

export function useDeleteSubmission(submissionId, challengeId, userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSubmission(submissionId),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: queryKeys.submissions.detail(submissionId),
        exact: true,
      });

      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.submissions.lists(challengeId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.challenges.detail(challengeId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.participations.detail(
            String(challengeId),
            String(userId),
          ),
          exact: true,
        }),
      ]);
    },
  });
}
