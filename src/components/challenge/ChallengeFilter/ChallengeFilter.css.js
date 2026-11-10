import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

// 팝업 안쪽 (피그마: 필터 제목 / 구역마다 구분선 / 아래 버튼 2개)
export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  width: 320,
  maxWidth: '100%',
  fontSize: 14,
  color: vars.color.gray[800],

  '@media': {
    // 모바일: 시트를 가득 채우고 버튼을 맨 아래로
    [media.mobile]: {
      width: '100%',
      flex: 1,
    },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 12,
  borderBottom: `1px solid ${vars.color.gray[200]}`,
});

export const heading = style({
  fontSize: 16,
  fontWeight: 600,
});

export const closeButton = style({
  display: 'inline-flex',
});

// 분야 / 문서 타입 / 상태 한 묶음
export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: 0,
  padding: '12px 0',
  border: 'none',
  borderBottom: `1px solid ${vars.color.gray[200]}`,
});

export const legend = style({
  float: 'left',
  width: '100%',
  marginBottom: 4,
  padding: 0,
  fontWeight: 600,
});

// 아이콘 + 글자 한 줄
export const option = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
});

// 진짜 input은 눈에 안 보이게 (키보드, 스크린리더는 그대로 사용)
export const hiddenInput = style({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

// 키보드로 이동했을 때 아이콘에 테두리
globalStyle(`${hiddenInput}:focus-visible + img`, {
  outline: `2px solid ${vars.color.gray[800]}`,
  outlineOffset: 2,
  borderRadius: 4,
});

// 초기화 · 적용하기 (가로 한 줄)
export const actions = style({
  display: 'flex',
  gap: 8,
  paddingTop: 16,

  '@media': {
    [media.mobile]: {
      marginTop: 'auto',
    },
  },
});

export const resetButton = style({
  flex: 1,
});

export const applyButton = style({
  flex: 1.5,
});
