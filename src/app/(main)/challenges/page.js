import { Suspense } from 'react';
import { ChallengeList } from '@/components/challenge/ChallengeList';

export default function Page() {
  return (
    <Suspense fallback={<p>불러오는 중...</p>}>
      <ChallengeList />
    </Suspense>
  );
}
