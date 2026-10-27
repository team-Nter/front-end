import { style } from '@vanilla-extract/css';
import { textField } from '../TextField.css.js';

export const textarea = style([
  textField,
  {
    minHeight: 48,
    lineHeight: 1.5,
    resize: 'vertical',
  },
]);
