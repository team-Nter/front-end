import {
  createSubmissionDraft,
  deleteSubmissionDraft,
  getSubmissionDraft,
} from '@/api/submission-draft';
import { queryKeys } from '@/constants/query-keys';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

export function useSubmissionDraft(challengeId, userId) {
  const queryClient = useQueryClient();

  const draftQuery = useSuspenseQuery({
    queryKey: queryKeys.submissionDraft.detail(challengeId, userId),
    queryFn: () => getSubmissionDraft(challengeId),
  });

  const saveDraft = useMutation({
    mutationFn: ({ title, content }) =>
      createSubmissionDraft(challengeId, { title, content }),
    onSuccess: (result) =>
      queryClient.setQueryData(
        queryKeys.submissionDraft.detail(challengeId, userId),
        result,
      ),
  });

  const deleteDraft = useMutation({
    mutationFn: () => deleteSubmissionDraft(challengeId, userId),
    onSuccess: () =>
      queryClient.setQueryData(
        queryKeys.submissionDraft.detail(challengeId, userId),
        { challengeId, submissionDraft: null },
      ),
  });

  return { draftQuery, saveDraft, deleteDraft };
}
