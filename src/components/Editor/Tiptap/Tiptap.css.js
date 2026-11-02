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
  color: '#24292f',
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: 14,
  lineHeight: 1.7,
  whiteSpace: 'pre',
  overflowWrap: 'normal',
  tabSize: 2,
});

globalStyle(`${body} .tiptap pre code`, {
  font: 'inherit',
  background: 'transparent',
  padding: 0,
});

const syntaxColors = {
  'keyword, selector-tag, deletion': '#cf222e',
  'string, regexp, addition': '#116329',
  'comment, quote': '#6e7781',
  'number, literal, built_in, type, attr, attribute': '#0550ae',
  'title, section, selector-id, selector-class': '#8250df',
  'name, tag': '#116329',
  'variable, template-variable, symbol, bullet, meta': '#953800',
};

for (const [tokens, color] of Object.entries(syntaxColors)) {
  globalStyle(
    tokens
      .split(', ')
      .map((token) => `${body} .tiptap pre .hljs-${token}`)
      .join(', '),
    { color },
  );
}

globalStyle(`${body} .tiptap pre .hljs-emphasis`, { fontStyle: 'italic' });
globalStyle(`${body} .tiptap pre .hljs-strong`, { fontWeight: 700 });
