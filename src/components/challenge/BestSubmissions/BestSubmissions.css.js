import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

// 접힌 상태 최대 높이 (JSX의 비교 값과 같아야 해요)
export const COLLAPSED_HEIGHT = 200;

// 가로 캐러셀: 카드가 한 줄로 놓이고 스크롤이 카드 시작점에 붙음
export const list = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 24,
  margin: 0,
  padding: 2,
  listStyle: 'none',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollPadding: 2,
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
  '@media': {
    [media.mobile]: { gap: 16 },
  },
});

export const card = style({
  position: 'relative',
  padding: '52px 24px 16px',
  border: `2px solid ${vars.color.gray[100]}`,
  borderRadius: 16,
  backgroundColor: vars.color.gray[50],
  '@media': {
    [media.mobile]: { padding: '44px 16px 12px' },
  },
});

// 왼쪽 위 검정 탭
export const tab = style({
  position: 'absolute',
  top: -2,
  left: -2,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  height: 34,
  margin: 0,
  padding: '0 16px',
  borderRadius: '14px 0 14px 0',
  backgroundColor: vars.color.gray[800],
  color: vars.color.brand.white,
  fontSize: 14,
  fontWeight: 500,
});

// 작성자 · 좋아요 · 날짜 줄
export const meta = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  paddingBottom: 12,
  borderBottom: `1px solid ${vars.color.gray[200]}`,
});

export const metaLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  minWidth: 0,
});

export const author = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 0,
});

export const nickname = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[800],
});

export const grade = style({
  flexShrink: 0,
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.gray[500],
});

export const likes = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[800],
});

export const date = style({
  flexShrink: 0,
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.gray[400],
  '@media': {
    [media.mobile]: { fontSize: 12 },
  },
});

// 본문: 접힌 상태에서만 높이 제한
export const content = style({
  overflow: 'hidden',
  minHeight: COLLAPSED_HEIGHT, // 짧은 글도 접힌 높이만큼 자리 차지
});

export const collapsed = style({
  maxHeight: COLLAPSED_HEIGHT,
});

// 더보기 줄 자리: 버튼이 없어도 같은 높이를 차지
export const footer = style({
  display: 'flex',
  justifyContent: 'center',
  minHeight: 32,
});

export const toggle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  margin: '8px 0 0', // 'auto' 가운데 정렬은 footer가 맡아요
  fontSize: 16,
  fontWeight: 500,
  color: vars.color.gray[800],
  borderRadius: 4,
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[800]}`,
    outlineOffset: 2,
  },
});

// 버튼 위치 기준
export const carousel = style({
  position: 'relative',
});

// 카드 한 칸: 기본은 꽉 차게(1개일 때)
export const item = style({
  flex: '0 0 100%',
  minWidth: 0,
  scrollSnapAlign: 'start',
  transition: 'opacity 200ms ease',
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});

// 지금 보고 있지 않은 카드 (시안: 투명도 20%)
export const itemInactive = style({
  opacity: 0.2,
});

// 여러 개일 때: 다음 카드가 살짝 보이도록 폭을 줄임
export const itemPeek = style({
  flexBasis: 'calc(100% - 64px)',
  '@media': {
    [media.tablet]: { flexBasis: 'calc(100% - 40px)' },
    [media.mobile]: { flexBasis: 'calc(100% - 36px)' },
  },
});

export const arrow = style({
  position: 'absolute',
  // 접힌 카드의 가운데에 고정 (50%면 더보기로 카드가 길어질 때 화살표가 같이 내려가요)
  top: 170,
  zIndex: 1,
  display: 'flex',
  width: 40,
  height: 40,
  borderRadius: '50%',
  transform: 'translateY(-50%)',
  ':focus-visible': {
    outline: `2px solid ${vars.color.gray[800]}`,
    outlineOffset: 2,
  },
  '@media': {
    [media.mobile]: { width: 24, height: 24 },
  },
});

export const arrowNext = style({
  right: 44,
  '@media': {
    [media.tablet]: { right: 20 },
    [media.mobile]: { right: 24 },
  },
});

// 시안에 ← 아이콘이 없어서 → 아이콘을 좌우 반전
export const arrowPrev = style({
  left: 8,
  scale: '-1 1',
});

export const arrowIcon = style({
  width: '100%',
  height: '100%',
});
