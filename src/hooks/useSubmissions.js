'use client';

import {
  createSubmission,
  getSubmission,
  getSubmissions,
} from '@/api/submissions';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useSubmission(submissionId) {
  return useQuery({
    queryKey: queryKeys.submissions.detail(submissionId),
    queryFn: () => getSubmission(submissionId),
    enabled: Boolean(submissionId),
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
  });
}
