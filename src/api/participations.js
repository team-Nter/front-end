import { API_BASE_URL } from '@/constants';

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
