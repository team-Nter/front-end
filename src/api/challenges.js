import { API_BASE_URL } from '@/constants/api';

export async function challengeRequest({
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

export function getChallenges(params = {}, { signal } = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    searchParams.set(key, Array.isArray(value) ? value.join(',') : value);
  });

  return challengeRequest({
    path: `/challenges?${searchParams}`,
    signal,
    errorMessage: '챌린지 목록을 불러오지 못했습니다.',
  });
}

export function getChallengeDetail(challengeId, { signal } = {}) {
  return challengeRequest({
    path: `/challenges/${challengeId}`,
    signal,
    errorMessage: '챌린지 정보를 불러오지 못했습니다.',
  });
}

export function createChallenge(body) {
  return challengeRequest({
    path: '/challenges',
    method: 'POST',
    body,
    errorMessage: '챌린지 신청 중 문제가 발생했습니다.',
  });
}

export function getMyChallenges(
  { type, page = 1, pageSize = 10, keyword, status } = {},
  { signal } = {},
) {
  const params = new URLSearchParams({
    type,
    page: String(page),
    pageSize: String(pageSize),
  });
  if (keyword) params.set('keyword', keyword);
  if (status) params.set('status', status);

  return challengeRequest({
    path: `/users/me/challenges?${params}`,
    signal,
    errorMessage: '나의 챌린지를 불러오지 못했습니다.',
  });
}

export function getMyChallengeDetail(challengeId) {
  return challengeRequest({
    path: `/users/me/challenges/${challengeId}`,
    errorMessage: '챌린지 정보를 불러오지 못했습니다.',
  });
}

export function updateMyChallenge(challengeId, body) {
  return challengeRequest({
    path: `/challenges/${challengeId}`,
    method: 'PATCH',
    body,
    errorMessage: '챌린지 수정 중 문제가 발생했습니다.',
  });
}

export function cancelMyChallenge(challengeId) {
  return challengeRequest({
    path: `/challenges/${challengeId}`,
    method: 'DELETE',
    errorMessage: '챌린지 신청을 취소하지 못했습니다.',
  });
}

export function getAdminChallenges(
  { status = [], sort, page = 1, pageSize = 10, keyword } = {},
  { signal } = {},
) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  if (status.length) params.set('status', status.join(','));
  if (sort) params.set('sort', sort);
  if (keyword) params.set('keyword', keyword);

  return challengeRequest({
    path: `/challenges/admin?${params}`,
    signal,
    errorMessage: '신청 목록을 불러오지 못했습니다.',
  });
}

export function getAdminChallengeDetail(
  challengeId,
  { status = [], sort, keyword } = {},
) {
  const params = new URLSearchParams();
  if (status.length) params.set('status', status.join(','));
  if (sort) params.set('sort', sort);
  if (keyword) params.set('keyword', keyword);

  return challengeRequest({
    path: `/challenges/admin/${challengeId}?${params}`,
    errorMessage: '신청 정보를 불러오지 못했습니다.',
  });
}

export function moderateChallenge({ challengeId, action, reason }) {
  return challengeRequest({
    path: `/challenges/${challengeId}/moderation-logs`,
    method: 'POST',
    body: { action, reason },
    errorMessage: '처리 중 문제가 발생했습니다.',
  });
}
