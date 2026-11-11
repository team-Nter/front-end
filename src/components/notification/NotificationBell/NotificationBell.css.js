import { style } from '@vanilla-extract/css';

export const trigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
});

export const popoverPanel = style({
  selectors: {
    '&&': {
      padding: 0,
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      backgroundColor: 'transparent',
      maxHeight: 'none',
      overflow: 'visible',
    },
  },
});
