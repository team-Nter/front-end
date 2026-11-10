import { style } from '@vanilla-extract/css';
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
