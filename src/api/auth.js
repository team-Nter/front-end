import { API_BASE_URL } from '@/constants/api';

async function authRequest({
  path,
  method = 'POST',
  body,
  errorMessage,
  signal,
  timeout = 3000,
} = {}) {
  const hasBody = body && Object.keys(body).length !== 0;
  const timeoutSignal = AbortSignal.timeout(timeout);

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
    body: hasBody ? JSON.stringify(body) : undefined,
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

  return await res.json();
}

export async function signup(body) {
  return authRequest({
    path: '/auth/signup',
    body,
    errorMessage: '회원가입 과정에서 문제가 발생했습니다.',
    timeout: 10000,
  });
}
// {
//   "email": "test@example.com",
//   "nickname": "번역하는개발자11",
//   "password": "test1234"
// }

export async function login(body) {
  return authRequest({
    path: '/auth/login',
    body,
    errorMessage: '로그인 중 문제가 발생했습니다.',
    timeout: 10000,
  });
}
// body: { email: example@email.com, password: test1234 }

export async function me({ signal } = {}) {
  try {
    return await authRequest({
      path: '/auth/me',
      method: 'GET',
      errorMessage: '사용자 정보 조회에 문제가 발생했습니다.',
      signal,
    });
  } catch (error) {
    if (error.status === 401) return null; // 비로그인은 에러가 아니라 정상 결과
    throw error;
  }
}

export async function logout() {
  return authRequest({
    path: '/auth/logout',
    errorMessage: '로그아웃 중 문제가 발생했습니다.',
  });
}
