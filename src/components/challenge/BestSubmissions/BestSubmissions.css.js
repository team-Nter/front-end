import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

// 접힌 상태 최대 높이 (JSX의 비교 값과 같아야 해요)
export const COLLAPSED_HEIGHT = 200;

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const card = style({
  position: 'relative',
  padding: '52px 24px 16px',
  border: `2px solid ${vars.color.gray[100]}`,
  borderRadius: 16,
  backgroundColor: vars.color.gray[50],
  '@media': {
    [media.mobile]: { padding: '44px 16px 12px' },
  },
});

// 왼쪽 위 검정 탭
export const tab = style({
  position: 'absolute',
  top: -2,
  left: -2,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  height: 34,
  margin: 0,
  padding: '0 16px',
  borderRadius: '14px 0 14px 0',
  backgroundColor: vars.color.gray[800],
  color: vars.color.brand.white,
  fontSize: 14,
  fontWeight: 500,
});

// 작성자 · 좋아요 · 날짜 줄
export const meta = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  paddingBottom: 12,
  borderBottom: `1px solid ${vars.color.gray[200]}`,
});

export const metaLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  minWidth: 0,
});

export const author = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
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
  flexShrink: 0,
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.gray[500],
});

export const likes = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[800],
});

export const date = style({
  flexShrink: 0,
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[400],
  '@media': {
    [media.mobile]: { fontSize: 12 },
  },
});

// 본문: 접힌 상태에서만 높이 제한
export const content = style({
  overflow: 'hidden',
});

export const collapsed = style({
  maxHeight: COLLAPSED_HEIGHT,
});

export const toggle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  margin: '8px auto 0',
  fontSize: 16,
  fontWeight: 500,
  color: vars.color.gray[800],
  borderRadius: 4,
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[800]}`,
    outlineOffset: 2,
  },
});
