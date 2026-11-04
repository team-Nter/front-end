import { style } from '@vanilla-extract/css';

export const userMenu = style({
  position: 'relative',
});

export const userMenuButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: '#ffbd17',
  cursor: 'pointer',
});

export const dropdown = style({
  position: 'absolute',
  top: 'calc(100% + 12px)',
  right: 0,
  zIndex: 100,

  display: 'flex',
  flexDirection: 'column',
  width: '208px',
  padding: '16px 20px',

  backgroundColor: '#fff',
  border: '1px solid #f1f1f1',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
});

export const userInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  paddingBottom: '12px',
});

export const avatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  backgroundColor: '#ffbd17',
});

export const userDetails = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: 0,
});

export const nickname = style({
  fontSize: '16px',
  fontWeight: 600,
  color: '#333',
});

export const grade = style({
  fontSize: '14px',
  color: '#888',
});

export const divider = style({
  width: '100%',
  height: '1px',
  marginBottom: '12px',
  backgroundColor: '#eee',
});

export const menuItem = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: '42px',
  padding: 0,

  border: 'none',
  backgroundColor: 'transparent',
  color: '#555',
  fontSize: '18px',
  textAlign: 'left',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      color: '#222',
    },
  },
});
