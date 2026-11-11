import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';
import { media } from '@/styles/media';

export const input = style({
  display: 'block',
  width: '100%',
  minWidth: 0,
  height: 72,
  padding: '24px 0',
  border: 0,
  borderBottom: `1px solid ${vars.color.gray[200]}`,
  borderRadius: 0,
  background: 'transparent',
  color: vars.color.brand.dark,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '24px',
  '::placeholder': { color: vars.color.gray[400] },
  ':focus-visible': {
    outline: 'none',
    borderBottomColor: vars.color.brand.gold,
  },
  '@media': { [media.mobile]: { height: 80, padding: '16px 0 40px' } },
});
