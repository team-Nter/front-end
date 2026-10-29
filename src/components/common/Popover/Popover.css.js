import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  verticalAlign: 'top',
});

export const panel = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  zIndex: 100,
  width: 'max-content',
  minWidth: '100%',
  maxWidth: 'calc(100vw - 32px)',
  maxHeight: 'min(320px, 50dvh)',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  padding: 12,
  border: `1px solid ${vars.color.gray[200]}`,
  borderRadius: 8,
  backgroundColor: vars.color.brand.white,
  color: vars.color.gray[900],
  boxShadow: `0 4px 16px color-mix(in srgb, ${vars.color.brand.dark} 10%, transparent)`,
});

export const align = styleVariants({
  left: { left: 0 },
  right: { right: 0 },
});
