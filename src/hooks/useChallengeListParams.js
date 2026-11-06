'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export function useChallengeListParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get('page'));

  const params = {
    page: Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1,
    category: searchParams.get('category') ?? undefined,
    documentType: searchParams.get('documentType') ?? undefined,
    progress: searchParams.get('progress') ?? undefined,
    keyword: searchParams.get('keyword') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
  };

  const updateParams = (changes) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      const isEmpty =
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, Array.isArray(value) ? value.join(',') : value);
      }
    });

    // 필터가 바뀌면 1페이지부터 다시 보기
    if (!('page' in changes)) nextParams.delete('page');

    const query = nextParams.toString();
    window.history.pushState(
      null,
      '',
      query ? `${pathname}?${query}` : pathname,
    );
  };

  return { params, updateParams };
}
