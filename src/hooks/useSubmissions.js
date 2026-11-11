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
import { useRouter } from 'next/navigation';

export function useSubmission(submissionId) {
  return useSuspenseQuery({
    queryKey: queryKeys.submissions.detail(submissionId),
    queryFn: () => getSubmission(submissionId),
    retry: (failureCount, error) =>
      ![400, 401, 403, 404].includes(error?.status) && failureCount < 3,
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
    onSuccess: (submission) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.participations.detail(
            challengeId,
            String(submission.author.id),
          ),
          exact: true,
          refetchType: 'all',
        }),
        // 작업물에 따라 바뀌는 챌린지 쿼리만 갱신합니다.
        // 상세(mySubmissionId, 참여 현황 포함)와 나의 챌린지 목록(mySubmissionId)
        queryClient.invalidateQueries({
          queryKey: queryKeys.challenges.detail(challengeId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.challenges.myLists(),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.submissions.lists(challengeId),
        }),
      ]),
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
  const router = useRouter();

  return useMutation({
    mutationFn: (reason) => deleteSubmission(submissionId, reason),
    onSuccess: () => {
      router.replace(`/challenges/${challengeId}`);

      // 삭제함에 따라,
      queryClient.invalidateQueries({
        queryKey: queryKeys.challenges.detail(challengeId),
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.challenges.myLists(),
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.submissions.lists(challengeId),
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.participations.detail(
          String(challengeId),
          String(userId),
        ),
        exact: true,
        refetchType: 'none',
      });

      // 삭제된 작업물 캐시는 남겨두면 뒤로가기 때 옛 내용이 보이므로 지웁니다.
      // 위에서 refetch를 막아 두어서, 지운 뒤 현재 화면이 다시 요청(404)하지 않습니다.
      queryClient.removeQueries({
        queryKey: queryKeys.submissions.detail(submissionId),
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: queryKeys.feedbacks.lists(submissionId),
      });
    },
  });
}
