import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  backgroundColor: `color-mix(in srgb, ${vars.color.brand.dark} 60%, transparent)`,
});

export const modal = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: 496,
  maxWidth: '100%',
  maxHeight: 'calc(100dvh - 32px)',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  padding: 24,
  border: `2px solid ${vars.color.brand.dark}`,
  borderRadius: 8,
  backgroundColor: vars.color.brand.white,
  color: vars.color.brand.dark,
});
