import { API_BASE_URL } from '@/constants';

export async function getSubmissionDraft(challengeId) {
  const response = await fetch(
    `${API_BASE_URL}/challenges/${challengeId}/draft`,
    {
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      typeof body?.message === 'string' ? body.message.trim() : '';
    const error = new Error(message || '임시저장 조회에 실패했습니다.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function createSubmissionDraft(challengeId, data) {
  const response = await fetch(
    `${API_BASE_URL}/challenges/${challengeId}/draft`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      typeof body?.message === 'string' ? body.message.trim() : '';
    const error = new Error(message || '임시저장에 실패했습니다.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function deleteSubmissionDraft(challengeId) {
  const response = await fetch(
    `${API_BASE_URL}/challenges/${challengeId}/draft`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      typeof body?.message === 'string' ? body.message.trim() : '';
    const error = new Error(message || '임시저장 삭제에 실패했습니다.');
    error.status = response.status;
    throw error;
  }
}
