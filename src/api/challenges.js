import { API_BASE_URL } from '@/constants/api';

export async function getChallenges(params = {}, { signal } = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    searchParams.set(key, Array.isArray(value) ? value.join(',') : value);
  });

  const res = await fetch(`${API_BASE_URL}/challenges?${searchParams}`, {
    signal,
  });

  if (!res.ok) {
    const resError = await res.json().catch(() => null);
    const error = new Error(
      resError?.message ?? '챌린지 목록을 불러오지 못했습니다.',
    );
    error.status = res.status;

    throw error;
  }

  return res.json();
}
