import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';

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
export const actions = style({ display: 'flex', alignItems: 'center', gap: 8 });
export const recoveryLink = style({ textDecoration: 'underline' });
