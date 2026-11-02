import { API_BASE_URL } from '@/constants';

export async function getSubmission(submissionId) {
  const response = await fetch(`${API_BASE_URL}/submission/${submissionId}`);

  if (!response.ok) {
    throw new Error('해당 작업물을 불러오지 못했습니다.');
  }

  return response.json();
}
