import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const field = style({
  width: '100%',
  minWidth: 0,
});

export const label = style({
  display: 'block',
  marginBottom: 8,
  color: vars.color.gray[900],
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 'normal',
});

export const errorMessage = style({
  margin: '8px 0',
  paddingLeft: 8,
  color: vars.color.error,
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '16px',
  overflowWrap: 'anywhere',
});

export const textField = style({
  boxSizing: 'border-box',
  display: 'block',
  width: '100%',
  minWidth: 0,
  padding: '11px 20px',
  border: `1px solid ${vars.color.gray[200]}`,
  borderRadius: 12,
  backgroundColor: vars.color.brand.white,
  color: vars.color.gray[900],
  fontFamily: 'inherit',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 'normal',

  '::placeholder': {
    color: vars.color.gray[400],
    opacity: 1,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[900]}`,
    outlineOffset: 2,
  },
  ':disabled': {
    backgroundColor: vars.color.brand.light,
    color: vars.color.gray[400],
    cursor: 'not-allowed',
  },

  selectors: {
    '&[aria-invalid="true"]': {
      borderColor: vars.color.error,
    },
    '&[aria-invalid="true"]:focus-visible': {
      outline: `2px solid ${vars.color.error}`,
      outlineOffset: -1,
    },
  },
});
