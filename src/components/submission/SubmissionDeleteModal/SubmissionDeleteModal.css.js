import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';

export const dialog = style({
  width: 327,
  padding: 24,
  border: 0,
  borderRadius: 12,
  gap: 20,
  textAlign: 'center',
});
export const title = style({
  fontSize: 18,
  fontWeight: 600,
  wordBreak: 'keep-all',
});
export const description = style({ fontSize: 14, color: vars.color.gray[500] });
export const error = style({
  fontSize: 14,
  color: vars.color.error,
  overflowWrap: 'anywhere',
});
export const actions = style({
  display: 'flex',
  justifyContent: 'center',
  gap: 8,
});
