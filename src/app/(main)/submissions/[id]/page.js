'use client';

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
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={isPending}
        />
        <button type="submit" disabled={isPending || !content.trim()}>
          {isPending ? '등록 중...' : '등록'}
        </button>
        {isError && <p>피드백 등록에 실패했어요.</p>}
      </form>
      {feedbacks.map((feedback) => (
        <div key={feedback.id}>
          <p>{feedback.content}</p>
          <div>엔터</div>
        </div>
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? '불러오는 중...' : '더보기'}
        </button>
      )}
    </div>
  );
}
