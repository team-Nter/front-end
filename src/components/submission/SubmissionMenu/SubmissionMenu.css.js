import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';
import { media } from '@/styles/media';

export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  padding: 0,
  border: 0,
  background: 'transparent',
  cursor: 'pointer',
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[800]}`,
    outlineOffset: 3,
  },
});

export const panel = style({
  selectors: {
    '&&': {
      width: 139,
      padding: 0,
      borderColor: vars.color.gray[300],
      borderRadius: 8,
      boxShadow: 'none',
      overflow: 'hidden',
    },
  },
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '12px 16px',
  border: 0,
  background: vars.color.brand.white,
  color: vars.color.gray[500],
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '19px',
  textAlign: 'center',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  ':hover': { background: vars.color.gray[50] },
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[800]}`,
    outlineOffset: -3,
  },
  ':disabled': { cursor: 'not-allowed' },
  '@media': { [media.mobile]: { fontSize: 14, lineHeight: '17px' } },
});

export const deleteItem = style([
  item,
  { borderTop: `1px solid ${vars.color.gray[300]}` },
]);
