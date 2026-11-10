'use client';

import { Button } from '@/components/common/Button';
import { Feedback } from '@/components/feedback';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import * as feedbackStyles from '@/components/feedback/Feedback.css';
import { useCreateFeedback, useFeedbacks } from '@/hooks/useFeedback';
import { useState } from 'react';
import Link from 'next/link';
import { useMe } from '@/hooks/useMe';
import { getFeedbackErrorMessage } from '@/utils/feedbackError';

export default function FeedbackSection({ submissionId, challengeStatus }) {
  const [content, setContent] = useState('');
  const {
    data: user,
    isPending: isAuthLoading,
    isError: isAuthError,
    refetch: refetchUser,
  } = useMe();

  const pageSize = 3;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending: isLoading,
    isError: isLoadError,
    error: loadError,
    refetch,
  } = useFeedbacks(submissionId, pageSize);
  const {
    mutate: addFeedback,
    isPending,
    error: createError,
  } = useCreateFeedback(submissionId);

  const canWrite = challengeStatus === 'APPROVED';
  const canCreate =
    Boolean(user?.id) &&
    !isAuthError &&
    !isAuthLoading &&
    !isLoadError &&
    canWrite;

  const feedbacks = [
    ...new Map(
      (data?.pages.flatMap((page) => page.items) ?? []).map((item) => [
        item.id,
        item,
      ]),
    ).values(),
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedContent = content.trim();

    if (!canCreate || !trimmedContent || isPending) return;
    addFeedback(trimmedContent, {
      onSuccess: () => setContent(''),
    });
  }

  return (
    <section aria-label="피드백">
      {isAuthLoading ? (
        <p role="status">로그인 정보를 확인하는 중...</p>
      ) : isAuthError ? (
        <div role="alert">
          <p>로그인 정보를 확인하지 못했어요.</p>
          <Button variant="ghost" onClick={() => refetchUser()}>
            다시 시도
          </Button>
        </div>
      ) : !user?.id ? (
        <p>
          피드백을 작성하려면 <Link href="/login">로그인</Link>해 주세요.
        </p>
      ) : canCreate ? (
        <FeedbackForm
          content={content}
          onContentChange={setContent}
          onSubmit={handleSubmit}
          isPending={isPending}
          errorMessage={getFeedbackErrorMessage(createError, '등록')}
        />
      ) : !isLoading && !isLoadError ? (
        <p>현재 챌린지 상태에서는 피드백을 작성할 수 없어요.</p>
      ) : null}
      {isLoading && <p role="status">피드백을 불러오는 중...</p>}
      {isLoadError && (
        <div role="alert">
          <p>{getFeedbackErrorMessage(loadError, '조회')}</p>
          <Button variant="ghost" onClick={() => refetch()}>
            다시 시도
          </Button>
        </div>
      )}
      <div className={feedbackStyles.list}>
        {feedbacks.map((feedback) => (
          <Feedback
            key={feedback.id}
            feedback={feedback}
            submissionId={submissionId}
            canWrite={canWrite}
          />
        ))}
      </div>
      {hasNextPage && (
        <div className={feedbackStyles.moreContainer}>
          <Button
            variant="ghost"
            className={feedbackStyles.moreButton}
            onClick={() => {
              if (!isFetching && hasNextPage) fetchNextPage();
            }}
            disabled={isFetching}
            aria-busy={isFetchingNextPage}
          >
            {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
          </Button>
        </div>
      )}
    </section>
  );
}
