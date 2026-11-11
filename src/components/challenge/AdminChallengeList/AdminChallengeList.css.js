import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: '40px 80px',
  '@media': {
    [media.mobile]: { paddingTop: 24 },
  },
});

// 필터 버튼 + 검색창 줄
export const toolbar = style({
  display: 'flex',
  gap: 12,
  marginBottom: 24,
});

export const title = style({
  margin: '0 0 16px',
  fontSize: 20,
  fontWeight: 600,
  color: vars.color.gray[800],
});

export const filterButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  height: 40,
  padding: '0 12px 0 16px',
  border: `1px solid ${vars.color.gray[300]}`,
  borderRadius: 32,
  backgroundColor: vars.color.brand.white,
  fontSize: 16,
  color: vars.color.gray[800],
  whiteSpace: 'nowrap',
  cursor: 'pointer',

  selectors: {
    // 필터가 열려 있을 때 진하게
    '&[aria-expanded="true"]': {
      borderColor: vars.color.gray[800],
    },
  },
});

// Popover 기본 높이 제한(320px)을 풀어서 필터 전체가 스크롤 없이 보이게
export const filterPanel = style({
  maxHeight: 'none',
  padding: 16,
});

export const search = style({
  position: 'relative',
  flex: 1,
  minWidth: 0,
});

export const searchIcon = style({
  position: 'absolute',
  top: 8,
  left: 8,
  pointerEvents: 'none',
});

export const searchInput = style({
  boxSizing: 'border-box',
  width: '100%',
  height: 40,
  padding: '0 16px 0 36px',
  border: `1px solid ${vars.color.gray[200]}`,
  borderRadius: 20,
  backgroundColor: vars.color.brand.white,
  fontSize: 16,
  color: vars.color.gray[800],

  '::placeholder': {
    color: vars.color.gray[400],
  },
  ':focus-visible': {
    outline: 'none',
    borderColor: vars.color.gray[800],
  },
});

export const tableScroll = style({
  width: '100%',
  overflowX: 'auto',
});

export const header = style({
  minWidth: 720,
  height: 36,
  marginBottom: 8,
  borderRadius: 8,
  backgroundColor: vars.color.gray[800],
  color: vars.color.brand.white,
  fontSize: 13,
  fontWeight: 500,
});

export const list = style({
  minWidth: 720,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const item = style({
  height: 48,
  backgroundColor: vars.color.brand.white,
  borderBottom: `1px solid ${vars.color.gray[300]}`,
  color: vars.color.gray[500],
  fontSize: 13,

  selectors: {
    '&[data-status="CANCELED"]': {
      backgroundColor: vars.color.gray[50],
    },
  },
});

export const titleLink = style({
  color: vars.color.gray[800],
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const pagination = style({
  marginTop: 40,
});

export const message = style({
  padding: '80px 0',
  textAlign: 'center',
  fontSize: 16,
  color: vars.color.gray[500],
});

globalStyle(`${header} > div, ${item} > div`, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle(`${item} img`, {
  display: 'block',
});
