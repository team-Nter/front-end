import { globalStyle, style } from '@vanilla-extract/css';
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
  marginBottom: 8,
});

// "나의 챌린지"
export const title = style({
  margin: 0,
  fontSize: 20,
  fontWeight: 600,
  color: vars.color.gray[800],
});

// "신규 챌린지 신청
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

// 검색창 + 상태 드롭다운 줄
export const toolbar = style({
  display: 'flex',
  gap: 12,
  marginBottom: 24,
});

// 검색창 바깥 상자: 아이콘을 input 위에 겹치기 위한 기준점
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
});

// 상태 드롭다운
export const statusSelect = style({
  boxSizing: 'border-box',
  width: 140,
  height: 40,
  padding: '0 12px',
  border: `1px solid ${vars.color.gray[300]}`,
  borderRadius: 32,
  backgroundColor: vars.color.brand.white,
  fontSize: 16,
  color: vars.color.gray[800],
  cursor: 'pointer',

  selectors: {
    // 아직 상태를 안 골랐을 때 (value="") 회색 글자
    '&:has(option[value=""]:checked)': {
      color: vars.color.gray[400],
    },
  },

  '@media': {
    [media.mobile]: {
      width: 112,
      fontSize: 14,
    },
  },
});

// 표만 감싸는 상자: 화면이 좁으면 표만 옆으로 스크롤
export const tableScroll = style({
  width: '100%',
  overflowX: 'auto',
});

// 검은 머리글 줄
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

// ul 기본 모양(점, 들여쓰기) 없애기
export const list = style({
  minWidth: 720,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

// 데이터 한 줄
export const item = style({
  height: 48,
  backgroundColor: vars.color.brand.white,
  borderBottom: `1px solid ${vars.color.gray[300]}`,
  color: vars.color.gray[500],
  fontSize: 13,
});

// 제목 링크 (진한 글자, 올리면 밑줄)
export const titleLink = style({
  color: vars.color.gray[800],
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

// 페이지네이션
export const pagination = style({
  marginTop: 40,
});

// 불러오는 중, 에러, 빈 목록 안내 문구
export const message = style({
  padding: '80px 0',
  textAlign: 'center',
  fontSize: 16,
  color: vars.color.gray[500],
});

// "도전 계속하기
export const continueButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  height: 33,
  padding: '0 8px 0 16px',
  border: `1px solid ${vars.color.gray[800]}`,
  borderRadius: 999,
  backgroundColor: vars.color.brand.white,
  color: vars.color.gray[800],
  fontSize: 14,
  fontWeight: 700,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
});

// "내 작업물 보기 📄" (도전 계속하기와 같은 모양, 테두리 없이 연회색 바탕)
export const mySubmissionButton = style([
  continueButton,
  {
    border: 'none',
    backgroundColor: vars.color.gray[50],
  },
]);

export const cardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

// 칸 안 글자가 넘치면 … 으로 자르기 (긴 제목 대비)
globalStyle(`${header} > div, ${item} > div`, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

// 상태 칩 이미지 아래 생기는 글자 줄 틈 없애기
globalStyle(`${item} img`, {
  display: 'block',
});
