import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  width: 343,
  maxHeight: 465,
  padding: '16px 0',
  borderRadius: 8,
  border: `1px solid ${vars.color.gray[200]}`,
  backgroundColor: vars.color.brand.white,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
});

export const title = style({
  margin: 0,
  padding: '0 16px 8px',
  fontSize: 16,
  fontWeight: 600,
  color: vars.color.gray[800],
});

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  overflowY: 'auto',
});

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
  padding: '12px 16px',
  border: 'none',
  borderBottom: `1px solid ${vars.color.gray[200]}`,
  backgroundColor: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.color.gray[50] },
    '&[data-read="true"]': { opacity: 0.6 },
  },
});

export const text = style({
  fontSize: 14,
  lineHeight: 1.5,
  color: vars.color.gray[800],
  wordBreak: 'break-word',
});

export const date = style({
  fontSize: 13,
  color: vars.color.gray[400],
});

export const message = style({
  margin: 0,
  padding: '24px 16px',
  textAlign: 'center',
  fontSize: 14,
  color: vars.color.gray[500],
});