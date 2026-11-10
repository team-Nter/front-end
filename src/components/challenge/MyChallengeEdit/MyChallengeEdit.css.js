import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

export const message = style({
  paddingBlock: 80,
  textAlign: 'center',
  color: vars.color.gray[500],
});
