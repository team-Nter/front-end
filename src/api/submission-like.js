import { API_BASE_URL } from '@/constants';

export async function putSubmissionLike(submissionId) {
  const response = await fetch(
    `${API_BASE_URL}/submission/${submissionId}/like`,
    {
      method: 'PUT',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      typeof body?.message === 'string' ? body.message.trim() : '';
    const error = new Error(message || '좋아요 생성에 실패했습니다.');
    error.status = response.status;
    throw error;
  }
}

export async function deleteSubmissionLike(submissionId) {
  const response = await fetch(
    `${API_BASE_URL}/submission/${submissionId}/like`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      typeof body?.message === 'string' ? body.message.trim() : '';
    const error = new Error(message || '좋아요 취소에 실패했습니다.');
    error.status = response.status;
    throw error;
  }
}
