'use client';

import { useFeedbacks } from '@/hooks/useFeedback';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const pageSize = 1;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeedbacks(
    id,
    pageSize,
  );

  //배열 형태인 거 한 줄로 놔두기
  const feedbacks = data?.pages.flatMap((page) => page.items) ?? [];

  console.log(data);
  return (
    <div>
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
