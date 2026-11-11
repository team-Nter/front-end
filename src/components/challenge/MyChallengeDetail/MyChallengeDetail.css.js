import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: '40px 80px',
  '@media': {
    [media.mobile]: { paddingTop: 24 },
  },
});

export const message = style({
  paddingBlock: 80,
  textAlign: 'center',
  color: vars.color.gray[500],
});
