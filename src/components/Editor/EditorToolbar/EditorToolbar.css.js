import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';
import { media } from '@/styles/media';

export const toolbar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 15,
  paddingTop: 24,
  '@media': { [media.mobile]: { paddingTop: 16, gap: 12 } },
});
export const group = style({ display: 'flex', alignItems: 'center', gap: 2 });
export const iconButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  flexShrink: 0,
  borderRadius: 4,
  ':hover': { backgroundColor: vars.color.gray[100] },
  ':focus-visible': {
    outline: `2px solid ${vars.color.brand.gold}`,
    outlineOffset: 3,
  },
  selectors: {
    '&[aria-pressed="true"]': { backgroundColor: vars.color.brand.gold },
    '&[aria-expanded="true"]': { backgroundColor: vars.color.brand.gold },
  },
});
export const codeButton = style([
  iconButton,
  { width: 'auto', paddingInline: 8, fontSize: 13, fontWeight: 600 },
]);
export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  minWidth: 176,
});
export const colorLabel = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  fontSize: 14,
});
export const colorInput = style({
  width: 36,
  height: 28,
  padding: 0,
  cursor: 'pointer',
  background: 'transparent',
});
export const reset = style({
  textAlign: 'left',
  fontSize: 14,
  color: vars.color.gray[600],
  paddingBlock: 4,
  ':hover': { color: vars.color.brand.dark },
});
export const sourceRoot = style({
  position: 'fixed',
  right: 0,
  top: 136,
  zIndex: 10,
  '@media': { [media.tablet]: { top: 136 }, [media.mobile]: { top: 128 } },
});
export const sourceButton = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  width: 52,
  height: 99,
  border: '2px solid #F5F5F5',
  borderRadius: '24px 0 0 24px',
  background: vars.color.brand.white,
  color: vars.color.gray[500],
  fontSize: 16,
  fontWeight: 600,
  boxShadow: '0 4px 4px rgb(88 92 130 / 5%)',
  ':focus-visible': { outline: `2px solid ${vars.color.brand.gold}` },
  '@media': {
    [media.tablet]: {
      width: 69,
      height: 52,
      flexDirection: 'row',
      gap: 4,
      fontSize: 14,
    },
    [media.mobile]: { width: 69, fontSize: 14 },
  },
});
export const sourcePanel = style({ width: 260, fontSize: 14, lineHeight: 1.6 });
