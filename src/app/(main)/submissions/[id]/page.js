'use client';

import { useSubmission } from '@/hooks/useSubmissions';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();

  const { data, isPending, isError, error } = useSubmission(id);
  if (isPending) {
    return <p>불러오는 중...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  console.log(data);
  return <h1>내 파트</h1>;
}
