import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

export const login = style({
  selectors: {
    '&&': {
      width: 90,
      height: 40,
      minHeight: 40,
      padding: '0 16px',
      borderColor: vars.color.brand.dark,
      borderRadius: 12,
      fontSize: 16,
    },
  },
  '@media': {
    [media.mobile]: {
      selectors: {
        '&&': {
          width: 80,
          height: 32,
          minHeight: 32,
          borderRadius: 10,
          fontSize: 14,
        },
      },
    },
  },
});
