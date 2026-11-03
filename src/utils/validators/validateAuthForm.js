const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HAS_LETTER = /[A-Za-z]/;
const HAS_DIGIT = /\d/;
const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 16;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 24;

const hasLetterAndDigit = (value) =>
  HAS_LETTER.test(value) && HAS_DIGIT.test(value);

function validateEmail(email) {
  if (!email) {
    return '이메일을 입력해주세요.';
  } else if (!EMAIL_REGEX.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
}
function validatePassword(password) {
  if (password.trim() === '') {
    return '비밀번호를 입력해주세요.';
  }
}
function validateSignupPassword(password) {
  if (password.trim() === '') {
    return '비밀번호를 입력해주세요.';
  } else if (
    !password &&
    (password.length < PASSWORD_MIN_LENGTH ||
      password.length > PASSWORD_MAX_LENGTH)
  ) {
    return `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상 ${PASSWORD_MAX_LENGTH}자 이하로 작성해주세요.`;
  } else if (!password && !hasLetterAndDigit(password)) {
    return '비밀번호는 영문과 숫자를 모두 포함해야 합니다.';
  }
}
function validateNickname(nickname) {
  if (!nickname) {
    return '닉네임을 입력해주세요.';
  } else if (
    nickname.length < NICKNAME_MIN_LENGTH ||
    nickname.length > NICKNAME_MAX_LENGTH
  ) {
    return `닉네임은 ${NICKNAME_MIN_LENGTH}자 이상 ${NICKNAME_MAX_LENGTH}자 이하로 작성해주세요.`;
  }
}
function validatePasswordConfirmation(password) {
  if (passwordConfirmation.trim() === '') {
    return '비밀번호 확인을 입력해주세요.';
  } else if (password !== passwordConfirmation) {
    return '비밀번호가 일치하지 않습니다. 다시 확인해주세요.';
  }
}

function collectErrors(results) {
  const errors = {};
  for (const [field, message] of Object.entries(results)) {
    if (message) errors[field] = message;
  }
  return errors;
}

export function validateLogin({ email, password }) {
  return collectErrors({
    email: validateEmail(email),
    password: validatePassword(password),
  });
}
// email, nickname은 호출하는 쪽에서 trim한 값을 넘김
export function validateSignup({
  email,
  password,
  nickname,
  passwordConfirmation,
}) {
  return collectErrors({
    email: validateEmail(email),
    nickname: validateNickname(nickname),
    password: validateSignupPassword(password),
    passwordConfirmation: validatePasswordConfirmation(passwordConfirmation),
  });
}
