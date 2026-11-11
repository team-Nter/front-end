import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

export const header = style({
  width: '100%',
  backgroundColor: vars.color.brand.white,
  borderBottom: `1px solid ${vars.color.gray[100]}`,
});

export const inner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 24,
  // 네비 첫 글자(로고 120 + 간격 24 + 링크 여백 17 = 161px)가
  // 페이지 콘텐츠(996px) 시작선과 맞도록: 996 + 161 * 2 + 좌우 여백 24 * 2
  maxWidth: 1366,
  height: 59,
  '@media': {
    [media.mobile]: {
      height: 55,
      gap: 16,
    },
  },
});

export const left = style({
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  gap: 24,
  '@media': {
    [media.mobile]: { gap: 4 },
  },
});

export const logoLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  borderRadius: 4,
  ':focus-visible': {
    outline: `2px solid ${vars.color.brand.dark}`,
    outlineOffset: 4,
  },
});

export const logo = style({
  width: 120,
  height: 'auto',
  '@media': {
    [media.mobile]: { display: 'none' }, // 모바일에서는 심볼 로고로 교체
  },
});

// 모바일 전용 심볼 로고
export const logoMobile = style({
  display: 'none',
  width: 28,
  height: 28,
  '@media': {
    [media.mobile]: { display: 'block' },
  },
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: 16,
});
