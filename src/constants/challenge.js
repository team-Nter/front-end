export const CHALLENGE_CATEGORY_OPTIONS = [
  { value: 'NEXTJS', label: 'Next.js' },
  { value: 'MODERN_JS', label: 'Modern JS' },
  { value: 'API', label: 'API' },
  { value: 'WEB', label: 'Web' },
  { value: 'CAREER', label: 'Career' },
];

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'OFFICIAL_DOCUMENT', label: '공식문서' },
  { value: 'BLOG', label: '블로그' },
];

export const CHALLENGE_STATUS_OPTIONS = [
  { value: 'PENDING', label: '승인 대기' },
  { value: 'APPROVED', label: '신청 승인' },
  { value: 'REJECTED', label: '신청 거절' },
  { value: 'CANCELED', label: '챌린지 삭제' },
];

export const MY_CHALLENGE_TABS = [
  { value: 'participating', label: '참여중인 챌린지' },
  { value: 'completed', label: '완료한 챌린지' },
  { value: 'requested', label: '신청한 챌린지' },
];

export const getOptionLabel = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value;

export const PROGRESS_OPTIONS = [
  { value: 'open', label: '진행중' },
  { value: 'closed', label: '마감' },
];

export const CHALLENGE_SORT_OPTIONS = [
  { value: 'createdAtDesc', label: '최신순' },
  { value: 'createdAtAsc', label: '오래된순' },
];
