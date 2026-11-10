import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

// 정렬 버튼 (필터 버튼과 같은 알약 모양)
export const trigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 4,
  flexShrink: 0,
  width: 140,
  height: 40,
  padding: '0 8px 0 16px',
  border: `1px solid ${vars.color.gray[300]}`,
  borderRadius: 32,
  backgroundColor: vars.color.brand.white,
  fontSize: 16,
  color: vars.color.gray[800],
  whiteSpace: 'nowrap',
  cursor: 'pointer',

  selectors: {
    '&[aria-expanded="true"]': {
      borderColor: vars.color.gray[800],
    },
  },

  '@media': {
    // 모바일: 글자 없이 아이콘만 있는 동그란 버튼
    [media.mobile]: {
      justifyContent: 'center',
      width: 40,
      padding: 0,
    },
  },
});

// "최신순" 글자 (모바일에서는 숨김, aria-label로 이름 유지)
export const label = style({
  '@media': {
    [media.mobile]: {
      display: 'none',
    },
  },
});

// 펼쳐지는 패널 (Popover 기본 패널 위에 덮어쓰기)
export const panel = style({
  minWidth: 140,
  padding: 4,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

// 옵션 한 줄
export const option = style({
  display: 'block',
  width: '100%',
  padding: '8px 12px',
  borderRadius: 6,
  textAlign: 'left',
  fontSize: 14,
  color: vars.color.gray[600],
  whiteSpace: 'nowrap',

  ':hover': {
    backgroundColor: vars.color.gray[100],
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[800]}`,
    outlineOffset: -2,
  },
});

// 지금 선택된 옵션
export const optionSelected = style({
  fontWeight: 600,
  color: vars.color.gray[900],
});
