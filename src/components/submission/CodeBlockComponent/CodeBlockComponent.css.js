import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';

export const container = style({
  marginBlock: 16,
  border: `1px solid ${vars.color.gray[200]}`,
  borderRadius: 8,
  overflow: 'hidden',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '8px 12px',
  background: vars.color.brand.light,
  borderBottom: `1px solid ${vars.color.gray[200]}`,
  color: vars.color.gray[600],
  fontSize: 12,
  fontWeight: 600,
});

export const languageSelect = style({
  maxWidth: '70%',
  padding: '4px 8px',
  borderRadius: 4,
  background: vars.color.brand.white,
  color: vars.color.brand.dark,
  cursor: 'pointer',
  ':focus-visible': {
    outline: `2px solid ${vars.color.brand.gold}`,
    outlineOffset: 2,
  },
});
