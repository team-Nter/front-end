import { Suspense } from 'react';
import { ChallengeList } from '@/components/challenge/ChallengeList';

export default function Page() {
  return (
    <>
      <h1>4 + 12 챌린지 목록 (홍균님)</h1>
      <Suspense fallback={<p>불러오는 중...</p>}>
        <ChallengeList />
      </Suspense>
    </>
  );
}
