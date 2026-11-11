import { style } from '@vanilla-extract/css';
import { media } from '@/styles/media';
import { vars } from '@/styles/global.css';

export const draftSaveDescription = style({
  fontSize: 14,
  color: vars.color.gray[500],
});

export const page = style({
  position: 'relative',
  maxWidth: 890,
  marginInline: 'auto',
  paddingTop: 24,
  color: vars.color.brand.dark,
  minHeight: '100dvh',
  '@media': { [media.mobile]: { paddingTop: 16 } },
});
