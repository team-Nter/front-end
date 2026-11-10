import { API_BASE_URL } from '@/constants';
import { challengeRequest } from '@/api/challenges';

export async function getParticipation(challengeId, userId) {
  const response = await fetch(
    `${API_BASE_URL}/challenges/${challengeId}/participants/${userId}`,
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const error = new Error(
      body?.message ?? '참여 정보를 불러오지 못했습니다.',
    );
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function getParticipants(
  challengeId,
  { page = 1, pageSize = 10 } = {},
  { signal } = {},
) {
  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  return challengeRequest({
    path: `/challenges/${challengeId}/participants?${searchParams}`,
    signal,
    errorMessage: '참여 현황을 불러오지 못했습니다.',
  });
}

export function joinChallenge(challengeId) {
  return challengeRequest({
    path: `/challenges/${challengeId}/participants`,
    method: 'POST',
    errorMessage: '챌린지에 참여하지 못했습니다.',
  });
}
