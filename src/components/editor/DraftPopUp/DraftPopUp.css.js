import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';
import { media } from '@/styles/media';

export const banner = style({
  position: 'fixed',
  zIndex: 5,
  insetInline: 24,
  bottom: 'max(24px, env(safe-area-inset-bottom))',
  maxWidth: 890,
  marginInline: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  padding: 8,
  background: vars.color.gray[50],
  border: `1px solid ${vars.color.brand.dark}`,
  borderRadius: 8,
  '@media': {
    [media.mobile]: {
      insetInline: 16,
      bottom: 'max(16px, env(safe-area-inset-bottom))',
      flexWrap: 'wrap',
    },
  },
});
export const message = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flex: '1 1 165px',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.3,
  wordBreak: 'keep-all',
});
export const close = style({
  display: 'grid',
  placeItems: 'center',
  padding: 0,
  border: 0,
  background: 'transparent',
  cursor: 'pointer',
});
export const actions = style({ display: 'flex', alignItems: 'center', gap: 8 });
export const load = style({
  selectors: { '&&': { minWidth: 90, borderRadius: 10, fontSize: 14 } },
});
export const dialog = style({
  selectors: {
    '&&': {
      width: 327,
      minHeight: 206,
      padding: 24,
      borderRadius: 12,
      gap: 24,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxShadow: '0 4px 16px rgba(17,34,17,.05)',
    },
  },
});
export const question = style({
  maxWidth: 250,
  margin: 0,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.35,
  wordBreak: 'keep-all',
});
export const choice = style({
  selectors: {
    '&&': {
      width: 90,
      borderRadius: 12,
      borderColor: vars.color.brand.dark,
      fontSize: 16,
    },
  },
});
