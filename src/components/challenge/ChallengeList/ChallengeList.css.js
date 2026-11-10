import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

// 화면 전체
export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: '24px 80px',
});

// 제목 + 신규 챌린지 신청 버튼 줄
export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  marginBottom: 16,
});

// "챌린지 목록"
export const title = style({
  margin: 0,
  fontSize: 20,
  fontWeight: 600,
  color: vars.color.gray[800],
});

// 신규 챌린지 신청 (검정 알약 버튼)
export const newButton = style({
  height: 40,
  padding: '0 13px 0 16px',
  borderRadius: 999,
  backgroundColor: vars.color.gray[800],
  color: vars.color.brand.white,
  fontSize: 16,

  '@media': {
    [media.mobile]: {
      height: 32,
      padding: '0 10px 0 12px',
      fontSize: 14,
    },
  },
});

// 필터 · 검색 · 정렬 줄
export const toolbar = style({
  display: 'flex',
  gap: 12,
  marginBottom: 24,

  '@media': {
    [media.mobile]: {
      gap: 8,
    },
  },
});

// 필터 버튼 (기본: 흰 바탕)
export const filterButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  flexShrink: 0,
  minWidth: 112,
  height: 40,
  padding: '0 12px 0 16px',
  border: `1px solid ${vars.color.gray[300]}`,
  borderRadius: 32,
  backgroundColor: vars.color.brand.white,
  fontSize: 16,
  color: vars.color.gray[400],
  whiteSpace: 'nowrap',
  cursor: 'pointer',

  selectors: {
    '&[aria-expanded="true"]': {
      borderColor: vars.color.gray[800],
    },
  },

  '@media': {
    [media.mobile]: {
      minWidth: 88,
      fontSize: 14,
    },
  },
});

// 필터를 하나라도 적용했을 때: 검정 바탕 + 흰 글자
export const filterButtonActive = style({
  borderColor: vars.color.gray[800],
  backgroundColor: vars.color.gray[800],
  color: vars.color.brand.white,
});

// 검색창 바깥 상자 (아이콘을 input 위에 겹치는 기준점)
export const search = style({
  position: 'relative',
  flex: 1,
  minWidth: 0,
});

// 돋보기 아이콘
export const searchIcon = style({
  position: 'absolute',
  top: 8,
  left: 8,
  pointerEvents: 'none',
});

// 검색 input
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

  '@media': {
    [media.mobile]: {
      fontSize: 14,
    },
  },
});

// 카드 세로 목록 (카드 사이 24)
export const cardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  '@media': {
    [media.mobile]: {
      gap: 16,
    },
  },
});

// 페이지네이션 위 여백
export const pagination = style({
  marginTop: 40,

  '@media': {
    [media.mobile]: {
      marginTop: 24,
    },
  },
});

// 불러오는 중, 에러, 빈 목록 안내 문구
export const message = style({
  padding: '80px 0',
  textAlign: 'center',
  fontSize: 16,
  color: vars.color.gray[500],

  '@media': {
    [media.mobile]: {
      padding: '56px 0',
      fontSize: 14,
    },
  },
});

// 필터 팝업 바깥 상자 (Popover 기본 패널 위에 덮어쓰기)
export const filterPanel = style({
  maxHeight: 'none',
  padding: 16,

  '@media': {
    // 모바일: 화면 전체를 덮는 시트
    [media.mobile]: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      maxWidth: 'none',
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
});
