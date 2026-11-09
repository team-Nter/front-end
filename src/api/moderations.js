import { challengeRequest } from '@/api/challenges';

// 어드민 챌린지 처리: 승인(APPROVE) · 거절(REJECT) · 취소(CANCEL)
export function moderateChallenge(challengeId, { action, reason }) {
  return challengeRequest({
    path: `/challenges/${challengeId}/moderation-logs`,
    method: 'POST',
    body: { action, reason },
    errorMessage: '챌린지를 처리하지 못했습니다.',
  });
}
