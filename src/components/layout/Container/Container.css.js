import { style } from '@vanilla-extract/css';
import { media } from '@/styles/media';

export const container = style({
  boxSizing: 'border-box',
  width: '100%',
  // 콘텐츠 996px + 좌우 여백 24px씩
  maxWidth: 1044,
  minWidth: 0,
  marginInline: 'auto',
  paddingInline: 24,

  '@media': {
    [media.mobile]: {
      paddingInline: 16,
    },
  },
});
