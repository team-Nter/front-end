import { style } from '@vanilla-extract/css';
import { textField } from '../TextField.css.js';

export const input = style([textField, { height: 48 }]);

export const field = style({
  position: 'relative',
});

export const visibility = style({
  position: 'absolute',
  top: 36,
  right: 15,
  width: 24,
  height: 24,
  cursor: 'pointer',
});
