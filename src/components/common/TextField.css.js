import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

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
});
