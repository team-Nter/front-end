import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const modal = style({
  selectors: {
    '&&': { gap: 16, borderWidth: 1, borderRadius: 12 },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const title = style({
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  color: vars.color.gray[800],
});

export const closeButton = style({
  display: 'inline-flex',
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});