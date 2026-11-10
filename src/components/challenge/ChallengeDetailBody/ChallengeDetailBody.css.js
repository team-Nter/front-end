import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const body = style({
  display: 'flex',
  flexDirection: 'column',
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingBottom: 16,
  borderBottom: `1px solid ${vars.color.gray[200]}`,
});

export const title = style({
  margin: 0,
  fontSize: 24,
  fontWeight: 600,
  color: vars.color.gray[800],
});

export const chips = style({
  display: 'flex',
  gap: 8,
});

export const description = style({
  margin: 0,
  fontSize: 16,
  lineHeight: 1.6,
  color: vars.color.gray[700],
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

export const meta = style({
  display: 'flex',
  gap: 12,
  margin: 0,
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 13,
  color: vars.color.gray[600],
});

export const source = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingTop: 16,
});

export const sourceTitle = style({
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: vars.color.gray[800],
});

export const sourceBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '16px 20px',
  border: `1px solid ${vars.color.gray[200]}`,
  borderRadius: 12,
});

export const sourceUrl = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: 14,
  color: vars.color.gray[600],
});

export const sourceLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  padding: '6px 12px',
  borderRadius: 8,
  backgroundColor: vars.color.gray[100],
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[800],
  textDecoration: 'none',
});
