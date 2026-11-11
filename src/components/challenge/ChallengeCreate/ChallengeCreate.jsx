'use client';

import { useRouter } from 'next/navigation';
import { ChallengeForm } from '../ChallengeForm';
import { useCreateChallenge } from '@/hooks/useChallenges';

export default function ChallengeCreate() {
  const router = useRouter();
  const { mutate, isPending, error, reset } = useCreateChallenge();

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
