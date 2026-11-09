import { Suspense } from 'react';
import { ChallengeTable } from '@/components/challenge/MyChallengeTable';

export default function Page() {
  return (
    <Suspense>
      <ChallengeTable />
    </Suspense>
  );
}
