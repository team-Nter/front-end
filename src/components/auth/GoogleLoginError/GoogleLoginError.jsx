'use client';

import { useSearchParams } from 'next/navigation';

export default function GoogleLoginError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (!error) return null;

  return <p role="alert">{error}</p>;
}
