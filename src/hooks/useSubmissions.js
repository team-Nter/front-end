'use client';

import { getSubmission } from '@/api/submissions';
import { queryKeys } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';

export function useSubmission(submissionId) {
  return useQuery({
    queryKey: queryKeys.submissions.detail(submissionId),
    queryFn: () => getSubmission(submissionId),
    enabled: Boolean(submissionId),
  });
}
