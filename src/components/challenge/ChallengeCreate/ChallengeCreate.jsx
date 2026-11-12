'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChallengeForm } from '../ChallengeForm';
import { useCreateChallenge } from '@/hooks/useChallenges';
import { useMe } from '@/hooks/useMe';

const LOGIN_PATH = `/login?next=${encodeURIComponent('/challenges/new')}`;

export default function ChallengeCreate() {
  const router = useRouter();
  const { data: me, isPending: isMePending } = useMe();
  const { mutate, isPending, error, reset } = useCreateChallenge();

  const isLoggedOut = !isMePending && !me;

  useEffect(() => {
    if (isLoggedOut) router.replace(LOGIN_PATH);
  }, [isLoggedOut, router]);

  if (isMePending || isLoggedOut) return <p>불러오는 중...</p>;

  const handleSubmit = (body) => {
    mutate(body, {
      onSuccess: () => router.push('/my-challenges'),
    });
  };

  return (
    <ChallengeForm
      onSubmit={handleSubmit}
      isPending={isPending}
      error={error}
      onErrorReset={reset}
    />
  );
}
