import { API_BASE_URL } from '@/constants/api';

export async function getFeedbacks(submissionId, page, pageSize) {
  const response = await fetch(
    `${API_BASE_URL}/submission/${submissionId}/feedbacks?page=${page}&pageSize=${pageSize}`,
  );
  if (!response.ok) {
    throw new Error('피드백을 불러올 수 없습니다.');
  }

  return response.json();
}

export async function createFeedback(submissionId, content) {
  const response = await fetch(
    `${API_BASE_URL}/submission/${submissionId}/feedbacks`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    },
  );

  if (!response.ok) {
    throw new Error('피드백을 생성하지 못했습니다.');
  }

  return response.json();
}

export async function updateFeedback(feedbackId, content) {
  const response = await fetch(`${API_BASE_URL}/feedback/${feedbackId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('피드백을 수정하지 못했습니다.');
  }

  return response.json();
}

export async function deleteFeedback(feedbackId) {
  const response = await fetch(`${API_BASE_URL}/feedback/${feedbackId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('피드백을 삭제하지 못했습니다.');
  }
}
