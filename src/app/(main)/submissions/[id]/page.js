'use client';

import { Button } from '@/components/common/Button';
import { Feedback } from '@/components/feedback';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import * as feedbackStyles from '@/components/feedback/Feedback.css';
import { useCreateFeedback, useFeedbacks } from '@/hooks/useFeedback';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const { id } = useParams();
  const [content, setContent] = useState('');

  const pageSize = 1;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeedbacks(
    id,
    pageSize,
  );
  const { mutate: addFeedback, isPending, isError } = useCreateFeedback(id);

  //배열 형태인 거 한 줄로 놔두기
  const feedbacks = data?.pages.flatMap((page) => page.items) ?? [];

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedContent = content.trim();

    if (!trimmedContent || isPending) return;
    addFeedback(trimmedContent, {
      onSuccess: () => setContent(''),
    });
  }

  return (
    <div>
      <FeedbackForm
        content={content}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        isPending={isPending}
        isError={isError}
      />
      <div className={feedbackStyles.list}>
        {feedbacks.map((feedback) => (
          <Feedback key={feedback.id} feedback={feedback} />
        ))}
      </div>
      {hasNextPage && (
        <div className={feedbackStyles.moreContainer}>
          <Button
            variant="ghost"
            className={feedbackStyles.moreButton}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            aria-busy={isFetchingNextPage}
          >
            {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
          </Button>
        </div>
      )}
    </div>
  );
}
