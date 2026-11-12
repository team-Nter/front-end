import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const loginPage = style({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 24px',
  backgroundColor: vars.color.gray[50],
});

export const logoLink = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '32px',
});

export const logo = style({
  width: '289px',
  height: 'auto',
  '@media': {
    'screen and (max-width: 600px)': {
      width: '240px',
    },
  },
});

export const loginForm = style({
  width: '100%',
  maxWidth: '518px',
  display: 'flex',
  flexDirection: 'column',
  gap: '22px',
});

export const input = style({
  width: '100%',
  height: '48px',
  boxSizing: 'border-box',
  border: `1px solid ${vars.color.gray[200]}`,
  borderRadius: '12px',
  backgroundColor: vars.color.brand.white,
  color: vars.color.gray[900],
  fontSize: '14px',

  selectors: {
    '&::placeholder': {
      color: vars.color.gray[400],
    },
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.gray[500],
    },
  },
});

export const submitButton = style({
  width: '100%',
  height: '49px',
  marginTop: '1px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: vars.color.brand.dark,
  color: vars.color.brand.white,
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
});

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
});

export const googleLoginError = style({
  width: '100%',
  maxWidth: '518px',
});

export const signupGuide = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '24px',
  fontSize: '14px',
  color: vars.color.gray[600],
});

export const signupText = style({
  margin: 0,
});

export const signupLink = style({
  color: vars.color.gray[800],
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
});

export const connectionWarning = style({
  width: '100%',
});
