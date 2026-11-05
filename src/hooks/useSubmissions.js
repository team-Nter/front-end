'use client';

import {
  createSubmission,
  getSubmission,
  getSubmissions,
} from '@/api/submissions';
import { queryKeys } from '@/constants/query-keys';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

const NON_RETRYABLE_STATUS = [400, 401, 403, 404];

export function useSubmission(submissionId) {
  return useSuspenseQuery({
    queryKey: queryKeys.submissions.detail(submissionId),
    queryFn: () => getSubmission(submissionId),
    retry: (failureCount, error) =>
      !NON_RETRYABLE_STATUS.includes(error?.status) && failureCount < 3,
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
          submission.author.id,
        ),
        exact: true,
        refetchType: 'all',
      });
    },
  });
}
