// 추가 옵션 없을 때 적용되는 기본 설정 : 26.10.14 이런 형식
// 추가 옵션으로 2026년 10월 14일 이런 형식이라면 createDateFormatter({year : 'numeric}); 후 format 함수 쓰기
const DEFAULT_OPTIONS = {
  locale: 'en-GB',
  timeZone: 'Asia/Seoul',
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
};

export function createDateFormatter(options = {}) {
  const { locale, ...formatOptions } = { ...DEFAULT_OPTIONS, ...options };
  const formatter = new Intl.DateTimeFormat(locale, formatOptions);

  // 파트 별로 나눠서 값 얻기
  function getParts(value) {
    if (!value) return null;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    const parts = formatter.formatToParts(date); // 해당 값이 배열로 나옴

    // 배열 풀어서 type 에 맞는 값 가져오기
    const get = (type) => parts.find((part) => part.type === type)?.value;
    return {
      year: get('year'),
      month: get('month'),
      day: get('day'),
    };
  }

  function format(value, separator = '.') {
    const parts = getParts(value);
    if (!parts) return '';
    return [parts.year, parts.month, parts.day].join(separator);
  }

  return { getParts, format };
}

const defaultFormatter = createDateFormatter();
export const getDateParts = defaultFormatter.getParts;
export const formatDate = defaultFormatter.format;
