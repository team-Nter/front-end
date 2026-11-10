import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

// 박스 전체
export const box = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: '16px 24px 24px',
  border: `2px solid ${vars.color.gray[800]}`,
  borderRadius: 16,
  '@media': {
    [media.mobile]: { padding: 16 },
  },
});

// 제목 + 페이지 표시 한 줄
export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  minHeight: 32,
});

export const title = style({
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  color: vars.color.gray[800],
});

export const pager = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const pageCount = style({
  padding: '4px 16px',
  borderRadius: 13,
  backgroundColor: vars.color.gray[50],
  fontSize: 13,
  fontWeight: 500,
  color: vars.color.gray[800],
});

export const currentPage = style({
  color: vars.color.brand.gold,
});

export const arrows = style({
  display: 'flex',
});

export const arrowButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: 8,
  ':disabled': {
    cursor: 'not-allowed',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[800]}`,
    outlineOffset: -2,
  },
});

// 참여자 목록
export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

// 한 줄: [순위] [아바타 · 닉네임 · 등급] [좋아요 · 작업물 보기]
export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  minHeight: 35,
  padding: '12px 0',
  selectors: {
    '& + &': { borderTop: `1px solid ${vars.color.gray[200]}` },
    '&:first-child': { paddingTop: 0 },
    '&:last-child': { paddingBottom: 0 },
  },
  '@media': {
    [media.mobile]: { gap: 12 },
  },
});

// 순위 자리: 미제출자도 같은 폭을 차지해서 줄이 맞도록
export const rankSlot = style({
  flexShrink: 0,
  width: 51,
});

export const rank = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  height: 21,
  borderRadius: 16,
  backgroundColor: vars.color.gray[800],
  color: vars.color.brand.gold,
  fontSize: 14,
  fontWeight: 500,
});

export const user = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  flex: 1,
  minWidth: 0,
});

export const userText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 0,
});

export const nickname = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[800],
});

export const grade = style({
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.gray[500],
});

// 오른쪽 묶음: 데스크톱은 폭 184 안에서 양끝 정렬
export const side = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  width: 184,
  '@media': {
    [media.mobile]: { width: 'auto', gap: 12 },
  },
});

export const likes = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[500],
});

export const submissionLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.gray[800],
  textDecoration: 'none',
  ':hover': { textDecoration: 'underline' },
});

// 불러오는 중 · 에러 · 참여자 없음 문구
export const message = style({
  margin: 0,
  padding: '8px 0 16px',
  textAlign: 'center',
  fontSize: 14,
  lineHeight: 1.5,
  color: vars.color.gray[500],
  whiteSpace: 'pre-line',
});
