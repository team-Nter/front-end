import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

// 페이지 전체: 본문 890px 가운데 정렬, 위→아래로 쌓기
export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  maxWidth: 890,
  margin: '0 auto',
  padding: '24px 0',
  '@media': {
    [media.tablet]: { padding: 24 },
    [media.mobile]: { gap: 16, padding: 16 },
  },
});

// 상태 칩 + (정보 · 카드) 묶음: 칩을 가로 배치 바깥에 둬서 카드가 제목 높이에 맞도록
export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

// 위쪽: 왼쪽 정보 + 오른쪽 카드 가로 배치
export const top = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 24,
  '@media': {
    [media.tablet]: { gap: 16 },
    [media.mobile]: { flexDirection: 'column' },
  },
});

// 왼쪽 정보: 남는 폭 전부 차지
export const info = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const requestor = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  margin: 0,
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[800],
});

export const divider = style({
  width: '100%',
  margin: 0,
  border: 'none',
  borderTop: `1px solid ${vars.color.gray[200]}`,
});

// 오른쪽 카드: 마감일 · 인원 + 버튼
export const card = style({
  flexShrink: 0,
  width: 285,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '24px 16px',
  border: `2px solid ${vars.color.gray[100]}`,
  borderRadius: 16,
  backgroundColor: vars.color.brand.white,
  '@media': {
    [media.tablet]: { width: 251 },
    [media.mobile]: { width: '100%', padding: '12px 16px' },
  },
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 8,
  fontSize: 13,
  color: vars.color.gray[600],
});

export const metaItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
});

// 버튼 묶음: 데스크톱은 세로, 모바일은 가로 반반
export const buttons = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  '@media': {
    [media.mobile]: { flexDirection: 'row' },
  },
});

// 버튼 공통 (a · Link · button 모두에 씀)
export const actionButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  padding: '0 16px',
  border: '2px solid transparent',
  borderRadius: 12,
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 700,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand.gold}`,
      outlineOffset: 3,
    },
  },
  '@media': {
    [media.mobile]: { flex: 1, minWidth: 0 },
  },
});

export const actionVariant = styleVariants({
  source: {
    backgroundColor: vars.color.brand.gold,
    borderColor: vars.color.gray[800],
    color: vars.color.gray[800],
  },
  primary: {
    backgroundColor: vars.color.gray[800],
    color: vars.color.brand.white,
    selectors: {
      '&:disabled': {
        backgroundColor: vars.color.gray[200],
        color: vars.color.gray[500],
        cursor: 'not-allowed',
      },
    },
  },
});

export const error = style({
  margin: 0,
  fontSize: 13,
  textAlign: 'center',
  color: vars.color.error,
});
