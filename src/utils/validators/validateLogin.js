const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin({ email, password }) {
  const error = {};
  if (!email.trim()) {
    error.email = '이메일을 입력해주세요';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    error.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!password.trim()) {
    error.password = '비밀번호를 입력해주세요';
  }

  return error;
}
