import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const message = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
  margin: 0,
  padding: '80px 16px',
  textAlign: 'center',
  fontSize: 16,
  color: vars.color.gray[500],
});

export const retry = style({
  padding: '8px 16px',
  border: `1px solid ${vars.color.gray[300]}`,
  borderRadius: 8,
  background: vars.color.brand.white,
  cursor: 'pointer',
});