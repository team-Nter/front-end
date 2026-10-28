import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({});

globalStyle(`${container} .tiptap ul`, {
  listStyle: 'disc',
  paddingLeft: '24px',
});

globalStyle(`${container} .tiptap ol`, {
  listStyle: 'decimal',
  paddingLeft: '24px',
});
