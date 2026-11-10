import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

// ⋮ 버튼: 아이콘 크기 그대로, 키보드 포커스만 보이게
export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 24,
  height: 24,
  borderRadius: 4,

  ':hover': {
    backgroundColor: vars.color.gray[100],
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[800]}`,
    outlineOffset: 2,
  },
});

// 펼쳐지는 패널 (Popover 기본 패널 위에 덮어쓰기)
export const panel = style({
  minWidth: 139,
  padding: 0,
  borderColor: vars.color.gray[300],
  overflow: 'hidden',
});

// 메뉴 항목 (시안: 16px, gray500, 가운데)
export const item = style({
  display: 'block',
  width: '100%',
  padding: '12px 17px',
  fontSize: 16,
  textAlign: 'center',
  color: vars.color.gray[500],
  whiteSpace: 'nowrap',

  ':hover': {
    backgroundColor: vars.color.gray[50],
    color: vars.color.gray[800],
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[800]}`,
    outlineOffset: -2,
  },
});
