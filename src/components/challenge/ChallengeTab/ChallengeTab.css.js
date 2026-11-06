import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

// 탭 3개를 가로로 놓는 줄 + 전체 아래 얇은 회색 구분선
export const tabList = style({
  display: 'flex',
  borderBottom: `1px solid ${vars.color.gray[300]}`,
  marginBottom: 24,
});

// 탭 하나 (피그마: 높이 53, 좌우 여백 24, 18px SemiBold, 회색 글자)
export const tab = style({
  position: 'relative',
  height: 53,
  padding: '0 24px',
  border: 'none',
  background: 'none',
  fontSize: 18,
  fontWeight: 600,
  color: vars.color.gray[500],
  cursor: 'pointer',
  whiteSpace: 'nowrap',

  selectors: {
    // 선택된 탭: 진한 글자
    '&[aria-selected="true"]': {
      color: vars.color.gray[800],
    },
    // 선택된 탭: 아래 3px 검은 막대 (회색 구분선 위에 겹침)
    '&[aria-selected="true"]::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -1,
      height: 3,
      backgroundColor: vars.color.gray[800],
    },
    // 키보드로 이동했을 때만 테두리 표시
    '&:focus-visible': {
      outline: `2px solid ${vars.color.gray[800]}`,
      outlineOffset: -2,
    },
  },

  '@media': {
    [media.mobile]: {
      flex: 1,
      padding: '0 8px',
      fontSize: 16,
    },
  },
});
