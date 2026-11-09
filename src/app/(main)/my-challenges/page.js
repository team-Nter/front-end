import { Suspense } from 'react';
import { ChallengeTable } from '@/components/challenge/MyChallengeTable';

export default function Page() {
  return (
    <Suspense fallback={<p role="status">불러오는 중...</p>}>
      <ChallengeTable />
    </Suspense>
  );
}
