import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const googleLoginButton = style({
  width: '100%',
  maxWidth: '518px',
  height: '48px',
  marginTop: '18px',
  border: `1px solid ${vars.color.gray[200]}`,
  borderRadius: '12px',
  backgroundColor: vars.color.brand.white,
  color: vars.color.gray[900],
  fontSize: '16px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
});
