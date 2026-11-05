import {
  CHALLENGE_CATEGORY_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
} from '@/constants/challenge';

const URL_REGEX = /^https?:\/\/\S+$/;

export function validateChallenge(values) {
  const errors = {};

  const title = values.title.trim();
  if (!title) errors.title = '제목을 입력하세요.';
  else if (title.length > 30) errors.title = '제목은 30자 이하여야 합니다.';

  if (!URL_REGEX.test(values.sourceUrl.trim())) {
    errors.sourceUrl = 'http 또는 https 로 시작하는 원문 링크를 입력해주세요.';
  }

  if (!CHALLENGE_CATEGORY_OPTIONS.some((o) => o.value === values.category)) {
    errors.category = '분야를 선택해주세요.';
  }

  if (!DOCUMENT_TYPE_OPTIONS.some((o) => o.value === values.documentType)) {
    errors.documentType = '문서 타입을 선택해주세요.';
  }

  if (!values.deadline) {
    errors.deadline = '마감일을 선택해주세요.';
  } else if (new Date(toDeadlineAt(values.deadline)) <= new Date()) {
    errors.deadline = '마감일은 오늘보다 이전일 수 없습니다.';
  }

  const max = Number(values.maxParticipants);
  if (!Number.isInteger(max) || max < 1 || max > 15) {
    errors.maxParticipants = '최대 인원은 1~15 사이의 정수여야 합니다.';
  }

  const description = values.description.trim();
  if (!description) errors.description = '내용을 입력해주세요.';
  else if (description.length > 255)
    errors.description = '내용은 255자 이하여야 합니다.';

  return errors;
}

export function toDeadlineAt(date) {
  return `${date}T23:59:59+09:00`;
}
