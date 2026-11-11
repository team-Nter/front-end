import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

// 카드 (피그마: 흰 바탕, 테두리 2px #262626, 모서리 12, 안쪽 여백 24)
export const card = style({
  position: 'relative', // 메뉴(⋮)를 오른쪽 위에 놓기 위한 기준
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 24,
  border: `2px solid ${vars.color.gray[800]}`,
  borderRadius: 12,
  backgroundColor: vars.color.brand.white,

  '@media': {
    [media.mobile]: {
      padding: 16,
      gap: 12,
    },
  },
});

// 제목 (피그마: 22px SemiBold #404040)
export const title = style({
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  color: vars.color.gray[700],
  wordBreak: 'break-word',

  '@media': {
    [media.mobile]: {
      fontSize: 18,
    },
  },
});

export const titleLink = style({
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

// 분야 칩 + 문서 타입 칩 (피그마: 사이 8)
export const chips = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
});

// 아래 줄: 위에 회색 구분선, 왼쪽 정보 / 오른쪽 버튼
export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
  paddingTop: 16,
  borderTop: `1px solid ${vars.color.gray[200]}`,
});

// 마감일, 참여 인원 (피그마: 사이 12, 13px #525252)
export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 12,
  fontSize: 13,
  color: vars.color.gray[600],
});

// 아이콘 + 글자 한 묶음 (피그마: 사이 4)
export const metaItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  whiteSpace: 'nowrap',
});

// 오른쪽 버튼 (카드 전체 링크(::after)보다 위에 있어야 눌림)
export const action = style({
  position: 'relative',
  zIndex: 1,
  flexShrink: 0,
  marginLeft: 'auto',
});

// 오른쪽 위 메뉴(⋮) 자리 (어드민 목록에서만 사용)
export const menu = style({
  position: 'absolute',
  top: 24,
  right: 24,
  zIndex: 1, // 카드 전체 링크(::after)보다 위
  '@media': {
    [media.mobile]: { top: 16, right: 16 },
  },
});

// 메뉴가 있을 때 긴 제목이 ⋮ 밑으로 들어가지 않게
export const titleWithMenu = style({
  paddingRight: 32,
});

// 카드 전체 클릭 모드(목록에서만): hover 시 살짝 위로
export const cardClickable = style({
  transition: 'transform 150ms ease, box-shadow 150ms ease',
  selectors: {
    '&:hover': {
      zIndex: 1,
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 16px color-mix(in srgb, ${vars.color.brand.dark} 12%, transparent)`,
    },
    // 메뉴가 열려 있으면 다음 카드보다 위로 (드롭다운이 아래 카드에 가려지지 않게)
    '&:has([aria-expanded="true"])': {
      zIndex: 1,
    },
    // 삭제 모달이 렌더되는 순간부터(open 전 한 프레임 포함) 떠오르기를 즉시 끔
    // → 어두운 배경이 처음부터 화면 전체에 깔림
    '&:has(dialog)': {
      transform: 'none',
      transition: 'none',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
      selectors: {
        '&:hover': { transform: 'none' },
      },
    },
  },
});

// 제목 링크의 ::after를 카드 전체로 늘려서 카드 어디를 눌러도 이동
export const titleLinkStretched = style({
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 12,
    },
    // 키보드로 이동했을 때는 제목이 아니라 카드 전체에 테두리
    '&:focus-visible': {
      outline: 'none',
    },
    '&:focus-visible::after': {
      outline: `2px solid ${vars.color.brand.gold}`,
      outlineOffset: 2,
    },
  },
});
