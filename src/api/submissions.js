import { API_BASE_URL } from '@/constants';

export async function getSubmission(submissionId) {
  const response = await fetch(`${API_BASE_URL}/submission/${submissionId}`);

  if (!response.ok) {
    const error = new Error('작업물을 불러오지 못했습니다.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function getSubmissions(challengeId, page = 1, pageSize = 10) {
  const response = await fetch(
    `${API_BASE_URL}/challenges/${challengeId}/submissions?page=${page}&pageSize=${pageSize}`,
  );

  if (!response.ok) {
    const error = new Error('작업물을 불러오지 못했습니다.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function createSubmission(challengeId, data) {
  const response = await fetch(
    `${API_BASE_URL}/challenges/${challengeId}/submissions`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const error = new Error('작업물을 불러오지 못했습니다.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function updateSubmission(submissionId, data) {
  const response = await fetch(`${API_BASE_URL}/submission/${submissionId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error('작업물을 불러오지 못했습니다.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function deleteSubmission(submissionId) {
  const response = await fetch(`${API_BASE_URL}/submission/${submissionId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = new Error('작업물을 불러오지 못했습니다.');
    error.status = response.status;
    throw error;
  }
}
