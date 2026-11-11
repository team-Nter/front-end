import { createDateFormatter } from './formatDate';

// 한국어 숫자 형식(앞자리 0 없음), 시간대는 formatDate 기본값(Asia/Seoul)
const deadlineFormatter = createDateFormatter({
  locale: 'ko-KR',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

// '2026-04-23T14:59:59Z' → '2026년 4월 23일' (잘못된 값이면 빈 문자열)
export function formatDeadline(value) {
  const parts = deadlineFormatter.getParts(value);
  if (!parts) return '';

  return `${parts.year}년 ${parts.month}월 ${parts.day}일`;
}
