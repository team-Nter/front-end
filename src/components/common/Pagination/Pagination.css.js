import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

export const pagination = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 12,
});

export const pages = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 6,
});

export const page = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 40,
  height: 40,
  padding: 0,
  border: 0,
  borderRadius: 8,
  backgroundColor: 'transparent',
  color: vars.color.gray[400],
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 'normal',
  cursor: 'pointer',

  ':focus-visible': {
    outline: `2px solid ${vars.color.brand.dark}`,
    outlineOffset: 2,
  },
  selectors: {
    '&:hover:not(:disabled):not([aria-current="page"])': {
      backgroundColor: vars.color.brand.light,
    },
  },
  '@media': {
    [media.mobile]: {
      width: 32,
      height: 32,
    },
  },
});

export const active = style({
  backgroundColor: vars.color.brand.dark,
  color: vars.color.brand.gold,
});

export const arrow = style([
  page,
  {
    ':disabled': {
      cursor: 'not-allowed',
    },
  },
]);
