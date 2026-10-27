import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  flexShrink: 0,
  border: '1px solid transparent',
  borderRadius: 8,
  fontFamily: 'inherit',
  fontWeight: 600,
  lineHeight: 1.4,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'background-color 150ms ease, border-color 150ms ease',

  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand.gold}`,
      outlineOffset: 3,
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(1px)',
    },
    '&:disabled': {
      opacity: 0.45,
      cursor: 'not-allowed',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const size = styleVariants({
  sm: { minHeight: 32, padding: '6px 12px', fontSize: 12 },
  md: { minHeight: 40, padding: '10px 16px', fontSize: 14 },
  lg: { minHeight: 48, padding: '12px 20px', fontSize: 16 },
});

export const variant = styleVariants({
  primary: {
    backgroundColor: vars.color.brand.dark,
    color: vars.color.brand.white,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.gray[700],
      },
    },
  },
  secondary: {
    backgroundColor: vars.color.brand.white,
    borderColor: vars.color.gray[300],
    color: vars.color.brand.dark,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.brand.light,
      },
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: vars.color.brand.dark,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.brand.light,
      },
    },
  },
});

export const fullWidth = style({ width: '100%' });
