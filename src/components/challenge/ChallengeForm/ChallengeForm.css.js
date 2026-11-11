import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { textField } from '@/components/common/TextField.css.js';
import { media } from '@/styles/media';

export const form = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  maxWidth: 590,
  margin: '0 auto',
  padding: '40px 0',
  '@media': {
    [media.mobile]: { paddingTop: 24 },
  },
});

export const title = style({
  margin: 0,
  padding: '8px 0',
  color: vars.color.brand.dark,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
});

export const select = style([
  textField,
  {
    height: 56,
    padding: '0 16px',
    borderRadius: 4,
    cursor: 'pointer',
    selectors: {
      '&:invalid': { color: vars.color.gray[400] },
    },
  },
]);

export const maxParticipants = style({
  selectors: {
    '&&': { borderRadius: 8 },
  },
});

export const description = style({
  selectors: {
    '&&': {
      height: 219,
      padding: '16px 20px',
      borderColor: vars.color.gray[300],
      borderRadius: 6,
      resize: 'none',
    },
  },
});

export const serverError = style({
  margin: 0,
  color: vars.color.error,
  fontSize: 14,
  textAlign: 'center',
});
