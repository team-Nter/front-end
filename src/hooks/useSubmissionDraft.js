import {
  createSubmissionDraft,
  deleteSubmissionDraft,
  getSubmissionDraft,
} from '@/api/submission-draft';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useSubmissionDraft(
  challengeId,
  userId,
  { enabled = true } = {},
) {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.submissionDraft.detail(challengeId, userId);
  const cancelDraftQuery = () =>
    queryClient.cancelQueries({ queryKey, exact: true });

  const draftQuery = useQuery({
    enabled,
    queryKey,
    queryFn: () => getSubmissionDraft(challengeId),
    networkMode: 'always',
    retry: false,
  });

  const saveDraft = useMutation({
    networkMode: 'always',
    onMutate: cancelDraftQuery,
    mutationFn: ({ title, content }) =>
      createSubmissionDraft(challengeId, { title, content }),
    onSuccess: async (result) => {
      // 저장 중 새로 시작한 백그라운드 조회도 취소한다.
      await cancelDraftQuery();
      queryClient.setQueryData(queryKey, result);
    },
  });

  const deleteDraft = useMutation({
    networkMode: 'always',
    onMutate: cancelDraftQuery,
    mutationFn: () => deleteSubmissionDraft(challengeId),
    onSuccess: async () => {
      await cancelDraftQuery();
      queryClient.setQueryData(queryKey, {
        challengeId,
        submissionDraft: null,
      });
    },
  });

  return { draftQuery, saveDraft, deleteDraft };
}
