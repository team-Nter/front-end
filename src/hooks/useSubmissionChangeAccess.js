'use client';

import { useQuery } from '@tanstack/react-query';
import { getChallengeDetail } from '@/api/challenges';
import { queryKeys } from '@/constants/query-keys';

export function getSubmissionChangeReason(submission, user, challenge) {
  if (user?.role === 'ADMIN') return null;
  if (!user || submission?.author?.id !== user.id)
    return '작성자 혹은 관리자만 수정 및 삭제가 가능합니다.';
  if (submission.isSelected)
    return '선정된 작업물은 수정하거나 삭제할 수 없습니다.';
  if (!challenge || challenge.status !== 'APPROVED')
    return '진행 중인 챌린지의 작업물만 수정하거나 삭제할 수 있습니다.';
  if (new Date(challenge.deadlineAt) <= new Date())
    return '마감된 챌린지의 작업물은 수정하거나 삭제할 수 없습니다.';
  return null;
}

export function useSubmissionChangeAccess(submission, user) {
  const needsChallenge = Boolean(
    submission &&
    user &&
    user.role !== 'ADMIN' &&
    submission.author?.id === user.id &&
    !submission.isSelected,
  );
  const query = useQuery({
    queryKey: queryKeys.challenges.detail(submission?.challengeId),
    queryFn: ({ signal }) =>
      getChallengeDetail(submission.challengeId, { signal }),
    enabled: needsChallenge,
    staleTime: 0,
    refetchOnMount: 'always',
    retry: false,
  });
  const isChecking = needsChallenge && query.isPending;
  const isError = needsChallenge && query.isError;
  let reason = getSubmissionChangeReason(submission, user, query.data);

  if (isChecking) reason = '수정 및 삭제 가능 여부를 확인하고 있어요.';
  if (isError) {
    reason =
      query.error?.status === 404
        ? '챌린지가 없거나 진행 중이 아니어서 수정 및 삭제할 수 없습니다.'
        : '챌린지 상태를 확인하지 못했어요. 다시 시도해주세요.';
  }

  return {
    canChange: !reason,
    reason,
    isChecking,
    canRetry: isError && query.error?.status !== 404,
    retry: query.refetch,
  };
}
