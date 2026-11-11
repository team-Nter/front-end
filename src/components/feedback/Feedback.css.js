import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

export const card = style({
  width: '100%',
  minWidth: 0,
  padding: 16,
  borderRadius: 12,
  backgroundColor: vars.color.gray[50],
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});
export const editing = style({
  backgroundColor: vars.color.brand.white,
  boxShadow: `inset 0 0 0 1px ${vars.color.gray[200]}`,
});
export const header = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 8,
});
export const author = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  minWidth: 0,
});
export const avatar = style({ flexShrink: 0 });
export const authorInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minWidth: 0,
  fontWeight: 500,
  lineHeight: 'normal',
});
export const nickname = style({
  fontSize: 14,
  color: vars.color.gray[800],
  overflowWrap: 'anywhere',
});
export const date = style({
  fontSize: 12,
  color: vars.color.gray[400],
  whiteSpace: 'nowrap',
});
export const content = style({
  fontSize: 16,
  lineHeight: 'normal',
  color: vars.color.gray[700],
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  '@media': { [media.mobile]: { fontSize: 14 } },
});
export const editActions = style({ display: 'flex', flexShrink: 0, gap: 4 });
export const cancel = style({
  selectors: {
    '&&': {
      width: 64,
      height: 32,
      padding: 0,
      fontSize: 14,
      color: vars.color.gray[500],
      letterSpacing: '0.02em',
    },
  },
});
export const save = style({
  selectors: {
    '&&': {
      minWidth: 80,
      height: 32,
      padding: '2px 12px 3px',
      borderRadius: 10,
      fontSize: 14,
      lineHeight: 'normal',
      letterSpacing: '0.02em',
    },
  },
});
export const error = style({ fontSize: 14, color: vars.color.error });
export const status = style({ fontSize: 14, color: vars.color.gray[500] });
export const menuTrigger = style({
  selectors: {
    '&&': {
      padding: 0,
      border: 0,
      minHeight: 24,
      width: 24,
      height: 24,
      borderRadius: 4,
    },
  },
});
export const menuPanel = style({
  selectors: {
    '&&': {
      padding: 0,
      width: 139,
      borderColor: vars.color.gray[300],
      boxShadow: 'none',
      top: 'calc(100% + 8px)',
    },
  },
});
export const menuItems = style({ display: 'flex', flexDirection: 'column' });
export const menuItem = style({
  selectors: {
    '&&': {
      border: 0,
      borderRadius: 0,
      padding: '0 16px',
      height: 42,
      minHeight: 42,
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 'normal',
      color: vars.color.gray[500],
    },
    '&& + &': { borderTop: `1px solid ${vars.color.gray[300]}` },
  },
  '@media': { [media.mobile]: { fontSize: 14 } },
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
  margin: '24px 0',
});

export const moreContainer = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

export const moreButton = style({
  selectors: {
    '&&': {
      width: 180,
      maxWidth: '100%',
      height: 48,
      padding: 0,
      border: 0,
      borderRadius: 12,
      // Figma gray100 differs from the shared gray100 token.
      backgroundColor: '#F5F5F5',
      color: vars.color.gray[500],
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 'normal',
    },
    '&&:hover:not(:disabled)': {
      backgroundColor: vars.color.gray[200],
    },
  },
});

export const composer = style({
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});
export const composerRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 24,
  '@media': { [media.mobile]: { gap: 17 } },
});
export const composerInput = style({
  selectors: {
    '&&': {
      height: 89,
      minHeight: 89,
      padding: 16,
      borderRadius: 12,
      border: `1px solid ${vars.color.gray[200]}`,
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 'normal',
      color: vars.color.gray[700],
      resize: 'none',
      overflowY: 'auto',
      '@media': {
        [media.tablet]: { height: 108, minHeight: 108 },
        [media.mobile]: { height: 100, minHeight: 100, fontSize: 14 },
      },
    },
  },
});
export const submitButton = style({
  selectors: {
    '&&': {
      width: 40,
      height: 40,
      minHeight: 40,
      padding: 0,
      border: 0,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      '@media': { [media.mobile]: { width: 32, height: 32, minHeight: 32 } },
    },
    '&&:disabled': { opacity: 1 },
    '&&:hover:not(:disabled)': {
      backgroundColor: 'transparent',
      filter: 'brightness(1.15)',
    },
  },
});
export const submitIcon = style({
  flexShrink: 0,
  maxWidth: 'none',
  '@media': {
    [media.mobile]: { transform: 'scale(0.8)', transformOrigin: 'top left' },
  },
});
