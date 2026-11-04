'use client';

import {
  createSubmission,
  getSubmission,
  getSubmissions,
} from '@/api/submissions';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

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
  return useMutation({
    mutationFn: (data) => createSubmission(challengeId, data),
    onError: (error) => {
      alert(error.message);
    },
  });
}
