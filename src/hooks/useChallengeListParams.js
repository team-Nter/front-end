'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useChallengeListParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = {
    page: Number(searchParams.get('page')) || 1,
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
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return { params, updateParams };
}
