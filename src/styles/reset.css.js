import { globalStyle } from '@vanilla-extract/css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('*:not(dialog)', {
  margin: 0,
});

globalStyle('html', {
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      interpolateSize: 'allow-keywords',
    },
  },
});

globalStyle('body', {
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
});

globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
});

globalStyle('input, textarea, select', {
  font: 'inherit',
  border: 0,
});

globalStyle('p, h1, h2, h3, h4, h5, h6', {
  overflowWrap: 'break-word',
});

globalStyle('p', {
  textWrap: 'pretty',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  textWrap: 'balance',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});

globalStyle('ul, ol', {
  listStyle: 'none',
  padding: 0,
});

globalStyle('button', {
  padding: 0,
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  color: 'inherit',
  font: 'inherit',
});
