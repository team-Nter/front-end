import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';
import { media } from '@/styles/media';

export const container = style({ position: 'relative' });
export const body = style({
  position: 'relative',
  paddingTop: 24,
  '@media': { [media.mobile]: { paddingTop: 16 } },
});
export const placeholder = style({
  position: 'absolute',
  top: 24,
  left: 0,
  pointerEvents: 'none',
  color: vars.color.gray[400],
  fontSize: 16,
  lineHeight: 1.6,
  '@media': { [media.mobile]: { top: 16 } },
});
globalStyle(`${body} .tiptap`, {
  minHeight: 'calc(100dvh - 208px)',
  paddingBottom: 48,
  outline: 'none',
  fontSize: 16,
  lineHeight: 1.6,
  overflowWrap: 'anywhere',
  whiteSpace: 'pre-wrap',
});
globalStyle(`${body} .tiptap p`, { minHeight: '1.6em' });
globalStyle(`${body} .tiptap ul`, { listStyle: 'disc', paddingLeft: 24 });
globalStyle(`${body} .tiptap ol`, { listStyle: 'decimal', paddingLeft: 24 });
globalStyle(`${body} .tiptap blockquote`, {
  borderLeft: `3px solid ${vars.color.gray[300]}`,
  paddingLeft: 16,
});
globalStyle(`${body} .tiptap pre`, {
  background: vars.color.gray[50],
  padding: 16,
  borderRadius: 8,
  overflowX: 'auto',
});
