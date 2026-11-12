import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const signupLayout = style({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: vars.color.gray[50],
});

export const signupPage = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '505px',
  minHeight: '100vh',
  margin: '0 auto',
  padding: '50px 0 40px',
});

export const logoLink = style({
  display: 'block',
  width: '289px',
  height: '72px',
  marginBottom: '28px',
});

export const logo = style({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export const signupForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '22px',
  width: '100%',
});

export const input = style({
  width: '100%',
});

export const signupButton = style({
  width: '100%',
  height: '46px',
  marginTop: '1px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: vars.color.brand.dark,
  color: vars.color.brand.white,
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',

  selectors: {
    '&:hover:not(:disabled)': {
      opacity: 0.9,
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
});

export const googleLogin = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '18px',
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '24px',
});

export const footerText = style({
  margin: 0,
  color: vars.color.gray[600],
  fontSize: '14px',
});

export const footerLink = style({
  color: vars.color.gray[900],
  fontSize: '14px',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
});
