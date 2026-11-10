import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';
import { media } from '@/styles/media';
import { body as editorBody } from '@/components/Editor/Tiptap/Tiptap.css';

export const article = style({
  width: '100%',
  maxWidth: 960,
  marginInline: 'auto',
  paddingTop: 40,
  paddingBottom: 64,
  color: vars.color.gray[800],
  '@media': { [media.mobile]: { paddingTop: 24, paddingBottom: 40 } },
});

export const title = style({
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 1.4,
  letterSpacing: '-0.02em',
  marginBottom: 24,
  overflowWrap: 'anywhere',
  '@media': { [media.mobile]: { fontSize: 20, marginBottom: 20 } },
});

export const empty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 24,
  minHeight: 320,
  paddingBlock: 48,
  fontSize: 14,
  textAlign: 'center',
  color: vars.color.gray[600],
});

export const emptyImage = style({
  width: 240,
  maxWidth: '100%',
  height: 'auto',
});

export const metadata = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minHeight: 52,
  paddingBlock: 12,
  borderTop: `1px solid ${vars.color.gray[100]}`,
  borderBottom: `1px solid ${vars.color.gray[100]}`,
  fontSize: 12,
  lineHeight: 1.5,
  '@media': { [media.mobile]: { gap: 8, flexWrap: 'wrap' } },
});

export const author = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 0,
});
export const nickname = style({ overflowWrap: 'anywhere' });
export const likes = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  color: vars.color.gray[600],
  whiteSpace: 'nowrap',
});
export const heart = style({ fontSize: 21, lineHeight: 1 });
export const date = style({
  marginLeft: 'auto',
  color: vars.color.gray[500],
  whiteSpace: 'nowrap',
});

// 작성용 에디터의 목록·코드블록·문법 강조 스타일을 공유한다.
export const content = style([editorBody, { paddingTop: 24 }]);
export const feedbackDivider = style({
  border: 0,
  borderTop: `1px solid ${vars.color.gray[200]}`,
  marginBlock: 24,
});
globalStyle(`${content}.${content} .tiptap`, {
  minHeight: 0,
  paddingBottom: 0,
  fontSize: 16,
  lineHeight: 1.8,
  color: vars.color.gray[700],
});
globalStyle(`${content} .tiptap > * + *`, { marginTop: 16 });
globalStyle(`${content} .tiptap li > p`, { margin: 0 });
globalStyle(`${content} .tiptap li > ul, ${content} .tiptap li > ol`, {
  marginBlock: 4,
});
globalStyle(`${content} .tiptap h2`, {
  fontSize: 24,
  lineHeight: 1.5,
  fontWeight: 600,
});
globalStyle(`${content} .tiptap h3`, {
  fontSize: 20,
  lineHeight: 1.5,
  fontWeight: 600,
});
globalStyle(`${content} .tiptap a`, {
  textDecoration: 'underline',
  textUnderlineOffset: 3,
});
globalStyle(`${content} .tiptap hr`, {
  border: 0,
  borderTop: `1px solid ${vars.color.gray[200]}`,
  marginBlock: 24,
});
