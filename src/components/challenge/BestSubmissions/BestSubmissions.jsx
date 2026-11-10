'use client';

import { SubmissionDetail } from '@/components/submission/SubmissionDetail/SubmissionDetail';

export default function BestSubmissions({ submissions }) {
  if (submissions.length === 0) return null;

  return (
    <section>
      <h2>최다 추천 번역</h2>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <p>
              {submission.author?.nickname ?? '탈퇴한 사용자'} - 좋아요{' '}
              {submission.likeCount}
            </p>
            <SubmissionDetail content={submission.content} />
          </li>
        ))}
      </ul>
    </section>
  );
}
