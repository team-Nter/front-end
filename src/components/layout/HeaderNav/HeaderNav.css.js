import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

export const nav = style({
  minWidth: 0,
});

export const list = style({
  display: 'flex',
  alignItems: 'center',
});

export const link = style({
  position: 'relative', // hover 배경(::before)의 기준
  isolation: 'isolate', // 배경을 글자 뒤에 두면서 헤더 흰 배경보다는 위에 보이게
  display: 'flex',
  alignItems: 'center',
  height: 59, // 헤더 높이와 같게
  padding: '0 17px',
  fontSize: 16,
  fontWeight: 600,
  color: vars.color.gray[500],
  whiteSpace: 'nowrap',
  transition: 'color 300ms ease',
  selectors: {
    // hover 때 서서히 나타나는 연한 둥근 배경
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '12px 4px',
      zIndex: -1,
      borderRadius: 8,
      backgroundColor: vars.color.brand.light,
      opacity: 0,
      transition: 'opacity 300ms ease',
    },
    '&[aria-current="page"]': {
      fontWeight: 700,
      color: vars.color.gray[800],
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand.dark}`,
      outlineOffset: -4,
      borderRadius: 4,
    },
  },
  '@media': {
    // 마우스가 있는 기기에서만 hover 효과 (모바일에서 탭한 뒤 효과가 남지 않게)
    '(hover: hover)': {
      selectors: {
        '&:hover': { color: vars.color.gray[800] },
        '&:hover::before': { opacity: 1 },
      },
    },
    [media.mobile]: {
      height: 55,
      padding: '0 8px',
      fontSize: 14,
      fontWeight: 700,
      selectors: {
        '&::before': { inset: '10px 2px' },
      },
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
      selectors: {
        '&::before': { transition: 'none' },
      },
    },
  },
});
