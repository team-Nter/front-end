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

export async function signup(body) {
  return authRequest({
    path: '/auth/signup',
    body,
    errorMessage: '회원가입 과정에서 문제가 발생했습니다.',
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
  });
}
// body: { email: example@email.com, password: test1234 }

export async function me() {
  return authRequest({
    path: '/auth/me',
    method: 'GET',
    errorMessage: '사용자 정보 조회에 문제가 발생했습니다.',
  });
}

export async function logout() {
  return authRequest({
    path: '/auth/logout',
    errorMessage: '로그아웃 중 문제가 발생했습니다.',
  });
}
