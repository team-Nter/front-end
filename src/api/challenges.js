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
