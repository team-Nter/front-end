const BASE_URL = process.env.NEXT_PUBLIC_TEST_API_URL;

async function authRequest({ path, method = 'POST', body, errorMessage } = {}) {
  const hasBody = body && Object.keys(body).length !== 0;
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
    body: hasBody ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  if (!res.ok) {
    const resError = await res.json().catch(() => null);
    const error = new Error(resError?.message ?? errorMessage);
    error.status = res.status;
    throw error;
  }

  if (res.status === 204) return null;

  return await res.json();
}

export async function me() {
  return authRequest({
    path: '/auth/me',
    method: 'GET',
    errorMessage: '사용자 정보 조회에 문제가 발생했습니다.',
  });
}
