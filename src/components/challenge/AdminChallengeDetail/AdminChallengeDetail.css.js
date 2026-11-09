import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: '24px 80px',
});

export const message = style({
  paddingBlock: 80,
  textAlign: 'center',
  color: vars.color.gray[500],
});

export const navRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16,
});

export const number = style({
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[800],
});

export const nav = style({
  display: 'flex',
  gap: 8,
});

export const navArrow = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  selectors: {
    '&[aria-disabled="true"]': { cursor: 'default' },
  },
});

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 12,
  marginTop: 24,
  paddingTop: 24,
  borderTop: `1px solid ${vars.color.gray[200]}`,
});

export const actionButton = style({
  width: 160,
});

export const rejectButton = style([
  actionButton,
  {
    selectors: {
      '&&': {
        backgroundColor: '#FFE7E7',
        color: vars.color.error,
      },
      '&&:hover:not(:disabled)': {
        backgroundColor: '#FFDADA',
      },
    },
  },
]);
