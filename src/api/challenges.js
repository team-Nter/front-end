import { API_BASE_URL } from '@/constants/api';

async function challengeRequest({
  path,
  method = 'GET',
  body,
  errorMessage = '요청을 처리하지 못했습니다.',
  signal,
  timeout = 10000,
} = {}) {
  const timeoutSignal = AbortSignal.timeout(timeout);

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
  });

  if (!res.ok) {
    const resError = await res.json().catch(() => null);
    const error = new Error(resError?.message ?? errorMessage);
    error.status = res.status;
    throw error;
  }

  if (res.status === 204) return null;

  return res.json();
}
export function createChallenge(body) {
  return challengeRequest({
    path: '/challenges',
    method: 'POST',
    body,
    errorMessage: '챌린지 신청 중 문제가 발생했습니다.',
  });
}

export function getMyChallenges({
  type,
  page = 1,
  pageSize = 10,
  keyword,
} = {}) {
  const params = new URLSearchParams({
    type,
    page: String(page),
    pageSize: String(pageSize),
  });
  if (keyword) params.set('keyword', keyword);

  return challengeRequest({
    path: `/users/me/challenges?${params}`,
    errorMessage: '나의 챌린지를 불러오지 못했습니다.',
  });
}

export function getMyChallengeDetail(challengeId) {
  return challengeRequest({
    path: `/users/me/challenges/${challengeId}`,
    errorMessage: '챌린지 정보를 불러오지 못했습니다.',
  });
}

export function cancelMyChallenge(challengeId) {
  return challengeRequest({
    path: `/challenges/${challengeId}`,
    method: 'DELETE',
    errorMessage: '챌린지 신청을 취소하지 못했습니다.',
  });
}
