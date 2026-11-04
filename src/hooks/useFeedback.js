'use client';

import { getFeedbacks } from '@/api/feedback';
import { queryKeys } from '@/constants/query-keys';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export function useFeedbacks(submissionId, pageSize = 5) {
  // 페이지네이션용 불러오기 위해서 InfiniteQuery 사용
  return useInfiniteQuery({
    queryKey: queryKeys.feedbacks.list(submissionId, pageSize),
    queryFn: ({ pageParam }) => getFeedbacks(submissionId, pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: Boolean(submissionId),
  });
}
