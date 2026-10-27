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
  maxWidth: 1248,
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
    [media.mobile]: { gap: 16 },
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
    [media.mobile]: { width: 80 },
  },
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: 16,
});

export const login = style({
  selectors: {
    '&&': {
      width: 90,
      height: 40,
      minHeight: 40,
      padding: '0 16px',
      borderColor: vars.color.brand.dark,
      borderRadius: 12,
      fontSize: 16,
    },
  },
  '@media': {
    [media.mobile]: {
      selectors: {
        '&&': {
          width: 80,
          height: 32,
          minHeight: 32,
          borderRadius: 10,
          fontSize: 14,
        },
      },
    },
  },
});
