import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const notice = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  paddingBottom: 16,
  marginBottom: 16,
  borderBottom: `1px solid ${vars.color.gray[200]}`,
});

export const banner = style({
  margin: 0,
  padding: '10px 16px',
  borderRadius: 999,
  backgroundColor: '#FFE7E7',
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.error,
});

export const reasonBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '16px 20px',
  border: `1px solid ${vars.color.gray[200]}`,
  borderRadius: 12,
  backgroundColor: vars.color.gray[50],
  textAlign: 'center',
});

export const reasonTitle = style({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  color: vars.color.gray[800],
});

export const reason = style({
  margin: 0,
  fontSize: 14,
  lineHeight: 1.6,
  color: vars.color.gray[700],
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

export const date = style({
  alignSelf: 'flex-end',
  fontSize: 12,
  color: vars.color.gray[500],
});